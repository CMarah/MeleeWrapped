import { STAGE_DATA, CHAR_DATA } from './game_data';
import {
  Metadata,
  Stats,
  Stock,
}                                from './types';

export interface Result {
  metadata: Metadata;
  stats: Stats;
}

interface PlayerNames {
  code: string;
  netplay: string;
}

interface MatchInfo {
  playtime: number;
  is_win: boolean;
  opponent_name: PlayerNames;
  stage: string;
  char_me: string;
  char_op: string;
}

interface Nemesis {
  code: string;
  names: Array<string>;
  wins: number,
  games: number,
  winrate?: number,
}
interface Feature {
  name: string;
  wins: number;
  games: number;
  winrate?: number;
}

interface Data {
  playtime: number;
  wins: number;
  nemesis: { [id: string]: Nemesis };
  stages: { [id: string]: Feature };
  my_chars: { [id: string]: Feature };
  op_chars: { [id: string]: Feature };
}

export type CleanData = {
  playtime: number;
  games: number;
  winrate?: number;
  nemesis: Array<Nemesis>;
  stages: Array<Feature>;
  my_chars: Array<Feature>;
  op_chars: Array<Feature>;
} | { error: string };


export const filterResults = (full_results: Array<Result>) => {
  // TODO const valid_results = ... quitar los que no sean 1v1, menos de X, etc.;; Que hacer si no gameComplete??????
  const valid_results = full_results.filter(
    (result: Result) => result.stats.stocks.filter((stock: Stock) => stock.endFrame !== null).length === (result.stats.stocks.length - 1)
  );
  return valid_results;
};

const getWinner = (result: Result) => {
  const player_0_deaths = result.stats.stocks.filter(
    (stock: Stock) => stock.endFrame !== null && stock.playerIndex === 0
  ).length;
  const player_1_deaths = result.stats.stocks.filter(
    (stock: Stock) => stock.endFrame !== null && stock.playerIndex === 1
  ).length;
  // TODO consider quitouts (may need to change slippi-js) & other win conditions TODO do ports matter????
  return player_0_deaths > player_1_deaths ? 1 : 0;
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
  },
});

const empty_data = { playtime: 0, wins: 0, nemesis: {}, stages: {}, my_chars: {}, op_chars: {} };
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
  return Object.values(feature_info)
    .map((info: any) => ({
      ...info,
      winrate: info.games > 0 ? (info.wins / info.games) : 0,
    }))
    .sort((a: any, b: any) => b[sort_method] - a[sort_method])
    .slice(0, slice_at);
};

export const getData = (valid_results: Array<Result>, codes: Array<string>): CleanData => {
  if (valid_results.length === 0) return {
    error: "There aren't enough results",
  };

  const match_info = valid_results.map(getMatchInfo(codes));
  console.log('IR', valid_results, match_info);
  const data = synthetizeData(match_info);

  const [ nemesis, stages, my_chars, op_chars, ] = [
    'nemesis', 'stages', 'my_chars', 'op_chars',
  ].map(getRelevantData(data));
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
