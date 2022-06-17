//TODO
export interface Result {
  metadata: any;
  stats: any;
}
export interface CleanData {
  playtime: number;
  winrate: number;
}

const getAllCodes = (results: Array<Result>) => results.reduce((codes, { metadata }) => {
  const code_1 = metadata.players[0].names.code;
  const code_2 = metadata.players[1].names.code;
  codes[code_1] = (codes[code_1] || 0) + 1;
  codes[code_2] = (codes[code_2] || 0) + 1;
  return codes;
}, {} as any);

const getOurCode = (codes: any) => Object.entries(codes).reduce((our_code, possible_code) => {
  if (possible_code[1] as number > our_code.instances) return {
    code: possible_code[0],
    instances: possible_code[1],
  };
  return our_code;
}, { code: '', instances: 0 } as any).code;

const getWinner = (result: Result, player_index: number) => {
  const player_0_deaths = result.stats.stocks.filter(
    (stock: any) => stock.endFrame !== null && stock.playerIndex === 0
  ).length;
  const player_1_deaths = result.stats.stocks.filter(
    (stock: any) => stock.endFrame !== null && stock.playerIndex === 1
  ).length;
  // TODO consider quitouts (may need to change slippi-js) & other win conditions
  // TODO do ports matter????
  return player_0_deaths > player_1_deaths ? 1 : 0;
};

const getMatchInfo = (codes: Array<string>) => (result: Result) => {
  const { metadata, stats } = result;
  const player_index = codes.includes(metadata.players[0].names.code) ? 0 : 1;

  const winner = getWinner(result, player_index);

  return {
    is_win: winner === player_index,
  };
};

export const cleanDataFromResults = (full_results: Array<Result>) => {
  // TODO const valid_results = ... quitar los que no sean 1v1, menos de X, etc.
  // Si no tiene length, devolver error / algo
  // Que hacer si no gameComplete??????

  const valid_results = full_results.filter(
    (result: Result) => result.stats.stocks.filter((stock: any) => stock.endFrame !== null).length === (result.stats.stocks.length - 1)
  );
  console.log('F', valid_results.length, full_results.length);
  const codes = getAllCodes(valid_results);
  // TODO input if had multiple codes?
  //const our_codes = [getOurCode(codes)];
  const our_codes = ['MARAH#0', 'MARA#838'];
  console.log('C', codes, our_codes);

  const individual_results = valid_results.map(getMatchInfo(our_codes));

  const wins = individual_results.reduce(
    (wins, { is_win }) => wins + (is_win ? 1 : 0)
  , 0);
  const winrate = wins/valid_results.length;
  console.log('???', wins, valid_results.length, winrate);
  const total_playtime = valid_results.reduce(
    (playtime, { metadata }) => playtime + metadata.lastFrame, 0
  );
  return {
    playtime: total_playtime,
    winrate,
  };
};
