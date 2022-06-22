import { STAGE_DATA, CHAR_DATA } from './game_data';

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

const getWinner = (result: Result) => {
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

const getChar = (metadata: any, index: number) => Object.keys(metadata.players[index].characters)[0];

const getMatchInfo = (codes: Array<string>) => (result: Result) => {
  const { metadata, stats } = result;
  const player_index = codes.includes(metadata.players[0].names.code) ? 0 : 1;
  const opponent_index = player_index === 0 ? 1 : 0;

  const winner = getWinner(result);
  const stage = STAGE_DATA[stats.settings.stageId];
  const char_me = CHAR_DATA[getChar(metadata, player_index) as any];
  const char_op = CHAR_DATA[getChar(metadata, opponent_index) as any];

  return {
    playtime: metadata.lastFrame,
    is_win: winner === player_index,
    opponent_name: metadata.players[opponent_index].names,
    stage,
    char_me,
    char_op,
  };
};

const processNemesis = (nemesis: any, opponent_name: any, is_win: boolean) => {
  const op_code = opponent_name.code;
  const name_set = (nemesis[op_code]?.names || []).includes(opponent_name.netplay) ?
    nemesis[op_code].names : [...(nemesis[op_code]?.names || []), opponent_name.netplay];
  return {
    ...nemesis,
    [op_code]: {
      op_code,
      names: name_set,
      games: (nemesis[op_code]?.games || 0) + 1,
      wins:  (nemesis[op_code]?.wins  || 0) + (is_win ? 1 : 0),
    },
  };
};

const processStageData = (stages: any, stage: string, is_win: boolean) => {
  return {
    ...stages,
    [stage]: {
      name: stage,
      games: (stages[stage]?.games || 0) + 1,
      wins:  (stages[stage]?.wins  || 0) + (is_win ? 1 : 0),
    },
  };
};

const processMyCharData = (my_chars: any, char_me: string, is_win: boolean) => {
  return {
    ...my_chars,
    [char_me]: {
      name: char_me,
      games: (my_chars[char_me]?.games || 0) + 1,
      wins:  (my_chars[char_me]?.wins  || 0) + (is_win ? 1 : 0),
    },
  };
};

const processOpCharData = (op_chars: any, char_op: string, is_win: boolean) => {
  return {
    ...op_chars,
    [char_op]: {
      name: char_op,
      games: (op_chars[char_op]?.games || 0) + 1,
      wins:  (op_chars[char_op]?.wins  || 0) + (is_win ? 1 : 0),
    },
  };
};

const synthetizeData = (individual_results: Array<any>) => individual_results.reduce(
  (data: any, { playtime, is_win, opponent_name, stage, char_me, char_op }) => {
    data.playtime += playtime;
    data.wins += is_win ? 1 : 0;
    data.nemesis  = processNemesis(data.nemesis || {}, opponent_name, is_win);
    data.stages   = processStageData(data.stages || {}, stage, is_win);
    data.my_chars = processMyCharData(data.my_chars || {}, char_me, is_win);
    data.op_chars = processOpCharData(data.op_chars || {}, char_op, is_win);
    return data;
  }
, { playtime: 0, wins: 0 } as any);

const getRelevantData = (data: any) => (feature: string) => {
  const feature_info = data[feature];
  const slice_at = feature === 'nemesis' ? 5 : 30;
  const sort_method = feature === 'stages' ? 'winrate' : 'games';
  return Object.values(feature_info)
    .map((info: any) => ({
      ...info,
      winrate: info.games > 0 ? (info.wins / info.games) : 0,
    }))
    .sort((a: any, b: any) => b[sort_method] - a[sort_method])
    .slice(0, slice_at);
};

export const getData = (valid_results: Array<Result>, codes: Array<string>) => {
  if (valid_results.length === 0) return {
    error: "There aren't enough results",
  };

  const individual_results = valid_results.map(getMatchInfo(codes));
  console.log('IR', individual_results);
  const data = synthetizeData(individual_results);
  const [
    nemesis, stages, my_chars, op_chars,
  ] = ['nemesis', 'stages', 'my_chars', 'op_chars'].map(getRelevantData(data));
  const winrate = data.wins/valid_results.length;

  return {
    playtime: data.playtime,
    winrate,
    nemesis,
    stages,
    my_chars,
    op_chars,
  };
};
