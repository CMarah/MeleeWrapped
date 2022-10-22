import { STAGE_DATA, CHAR_DATA } from './game_data';
import {
  Metadata,
  Stock,
  Feature,
  Result,
  Nemesis,
  MatchInfo,
  Data,
  CleanData,
  PlayerNames,
}                                from './types';

const getWinner = (result: Result) => {
  const { stats } = result;
  const player_0_deaths = stats.stocks.filter(
    (stock: Stock) => stock.endFrame !== null && stock.playerIndex === 0
  ).length;
  const player_1_deaths = stats.stocks.filter(
    (stock: Stock) => stock.endFrame !== null && stock.playerIndex === 1
  ).length;
  if (stats.gameComplete) {
    return player_0_deaths === 4 ? 1 : 0;
  }
  if (player_0_deaths <= 2) return 0;
  if (player_1_deaths <= 2) return 1;


  const player_0_airborne = stats.inputs[0].airborne;
  const player_1_airborne = stats.inputs[1].airborne;
  if (player_0_airborne && !player_1_airborne) return 0;
  if (player_1_airborne && !player_0_airborne) return 1;

  const player_0_pausing = stats.inputs[0].pressing_start;
  const player_1_pausing = stats.inputs[1].pressing_start;
  if (player_0_pausing) return 1;
  if (player_1_pausing) return 0;

  return stats.combos.slice(-1)[0].playerIndex === 0 ? 1 : 0;
};

const getChar = (metadata: Metadata, index: 0 | 1): number =>
  parseInt(Object.keys(metadata.players[index].characters)[0]);

const getMatchInfo = (codes: Array<string>) => (result: Result): MatchInfo => {
  const { metadata, stats } = result;
  const player_code = metadata.players[0].names.code;
  const player_index = codes.includes(player_code) ? 0 : 1;
  const opponent_index = player_index === 0 ? 1 : 0;

  const winner = getWinner(result);
  const stage = STAGE_DATA[stats.settings.stageId];
  const char_me = CHAR_DATA[getChar(metadata, player_index)];
  const char_op = CHAR_DATA[getChar(metadata, opponent_index)];

  return {
    playtime: metadata.lastFrame,
    is_win: winner === player_index,
    opponent_name: metadata.players[opponent_index].names,
    stage,
    char_me,
    char_op,
  };
};

const processNemesis = (
  nemesis_data: { [id: string]: Nemesis },
  opponent_name: PlayerNames,
  is_win: boolean,
) => {
  const op_code = opponent_name.code;
  const name_set = (nemesis_data[op_code]?.names || []).includes(opponent_name.netplay) ?
    nemesis_data[op_code].names : [...(nemesis_data[op_code]?.names || []), opponent_name.netplay];
  return {
    ...nemesis_data,
    [op_code]: {
      code: op_code,
      names: name_set,
      games: (nemesis_data[op_code]?.games || 0) + 1,
      wins:  (nemesis_data[op_code]?.wins  || 0) + (is_win ? 1 : 0),
      winrate: 0,
    },
  };
};

const processFeature = (
  features: { [id: string]: Feature },
  feature: string,
  is_win: boolean,
) => ({
  ...features,
  [feature]: {
    name: feature,
    games: (features[feature]?.games || 0) + 1,
    wins:  (features[feature]?.wins  || 0) + (is_win ? 1 : 0),
    winrate: 0,
  },
});

const empty_data = {
  playtime: 0,
  wins: 0,
  nemesis: {},
  stages: {},
  my_chars: {},
  op_chars: {},
};
const synthetizeData = (match_info: Array<MatchInfo>) => match_info.reduce((
  data: Data,
  { playtime, is_win, opponent_name, stage, char_me, char_op },
) => {
    data.playtime += playtime;
    data.wins += is_win ? 1 : 0;
    data.nemesis  = processNemesis(data.nemesis, opponent_name, is_win);
    data.stages   = processFeature(data.stages, stage, is_win);
    data.my_chars = processFeature(data.my_chars, char_me, is_win);
    data.op_chars = processFeature(data.op_chars, char_op, is_win);
    return data;
  }
, empty_data);

const getRelevantData = (data: any) => (feature: string) => {
  const feature_info = data[feature];
  const slice_at = feature === 'nemesis' ? 5 : 30;
  const sort_method = feature === 'stages' ? 'winrate' : 'games';

  // Add winrate to data, sort by relavant value, slice top X
  return Object.values(feature_info)
    .map((info: any) => ({
      ...info,
      winrate: info.games > 0 ? (info.wins / info.games) : 0,
    }))
    .sort((a: any, b: any) => b[sort_method] - a[sort_method])
    .slice(0, slice_at);
};

export const getData = (valid_results: Array<Result>, codes: Array<string>): (CleanData | null) => {
  if (valid_results.length === 0) return null;

  const match_info = valid_results.map(getMatchInfo(codes));
  console.log('IR', valid_results, match_info);
  const data = synthetizeData(match_info);

  const [ nemesis, stages, my_chars, op_chars ] = ['nemesis', 'stages', 'my_chars', 'op_chars'].map(getRelevantData(data));
  const winrate = data.wins/valid_results.length;

  return {
    playtime: data.playtime,
    games: valid_results.length,
    winrate,
    nemesis,
    stages,
    my_chars,
    op_chars,
  };
};
