//TODO
export interface Result {
  metadata: any;
  stats: any;
}
export interface CleanData {
  playtime: number;
  winrate: number;
}

export const filterResults = (full_results: Array<Result>) => {
  // TODO const valid_results = ... quitar los que no sean 1v1, menos de X, etc.
  // Que hacer si no gameComplete??????
  const valid_results = full_results.filter(
    (result: Result) => result.stats.stocks.filter((stock: any) => stock.endFrame !== null).length === (result.stats.stocks.length - 1)
  );
  return valid_results;
};

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

export const cleanDataFromResults = (valid_results: Array<Result>, codes: Array<string>) => {
  if (valid_results.length === 0) return {
    error: "There aren't enough results",
  };

  const individual_results = valid_results.map(getMatchInfo(codes));

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
