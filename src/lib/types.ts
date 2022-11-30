// These types come from slippi-js

interface Player {
  characters: {
    [internalCharacterId: number]: number;
  };
  names: {
    netplay: string;
    code: string;
  };
}

export interface Metadata {
  startAt?: string | null;
  playedOn?: string | null;
  lastFrame: number;
  players: {
    [0]: Player;
    [1]: Player;
  };
}

export interface PlayerType {
  playerIndex: number;
  port: number;
  characterId: number | null;
  characterColor: number | null;
  startStocks: number | null;
  type: number | null;
  teamId: number | null;
  controllerFix: string | null;
  nametag: string | null;
  displayName: string;
  connectCode: string;
}

export enum GameMode {
  VS = 0x02,
  ONLINE = 0x08,
}

export interface Settings {
  slpVersion: string | null;
  isTeams: boolean | null;
  isPAL: boolean | null;
  stageId: number;
  players: PlayerType[];
  scene: number | null;
  gameMode: GameMode | null;
}

export interface Input {
  playerIndex: number;
  opponentIndex: number;
  inputCount: number;
  joystickInputCount: number;
  cstickInputCount: number;
  buttonInputCount: number;
  triggerInputCount: number;
  pressing_start?: boolean;
  airborne?: boolean;
}

export interface Stats {
  gameComplete: boolean;
  lastFrame: number;
  stocks: Stock[];
  last_combo: ComboType;
  settings: Settings;
  overall: OverallType[];
  inputs: {
    [0]: Input;
    [1]: Input;
  };
}

interface RatioType {
  count: number;
  total: number;
  ratio: number | null;
}

interface DurationType {
  startFrame: number;
  endFrame?: number | null;
}

interface DamageType {
  startPercent: number;
  currentPercent: number;
  endPercent?: number | null;
}

export interface Stock extends DurationType, DamageType {
  playerIndex: number;
  count: number;
  deathAnimation?: number | null;
}

interface MoveLandedType {
  playerIndex: number;
  frame: number;
  moveId: number;
  hitCount: number;
  damage: number;
}

interface ComboType extends DurationType, DamageType {
  playerIndex: number;
  moves: MoveLandedType[];
  didKill: boolean;
  lastHitBy: number | null;
}

interface ConversionType extends ComboType {
  openingType: string;
}

interface ActionCountsType {
  playerIndex: number;
  wavedashCount: number;
  wavelandCount: number;
  airDodgeCount: number;
  dashDanceCount: number;
  spotDodgeCount: number;
  ledgegrabCount: number;
  rollCount: number;
  lCancelCount: {
    success: number;
    fail: number;
  };
  grabCount: {
    success: number;
    fail: number;
  };
  throwCount: {
    up: number;
    forward: number;
    back: number;
    down: number;
  };
  groundTechCount: {
    // tech away/in are in reference to the opponents position and not the stage
    away: number;
    in: number;
    neutral: number;
    fail: number;
  };
  wallTechCount: {
    success: number;
    fail: number;
  };
}

interface InputCountsType {
  buttons: number;
  triggers: number;
  joystick: number;
  cstick: number;
  total: number;
}

interface OverallType {
  playerIndex: number;
  inputCounts: InputCountsType;
  conversionCount: number;
  totalDamage: number;
  killCount: number;
  successfulConversions: RatioType;
  inputsPerMinute: RatioType;
  digitalInputsPerMinute: RatioType;
  openingsPerKill: RatioType;
  damagePerOpening: RatioType;
  neutralWinRatio: RatioType;
  counterHitRatio: RatioType;
  beneficialTradeRatio: RatioType;
}

export interface Result {
  metadata: Metadata;
  stats: Stats;
}

export interface PlayerNames {
  code: string;
  netplay: string;
}

export interface MatchInfo {
  playtime: number;
  is_win: boolean;
  opponent_name: PlayerNames;
  stage: string;
  char_me: string;
  char_op: string;
  details: OverallType;
}

interface Map {
  [key: string]: number,
}
export interface Nemesis {
  code: string;
  names: Map;
  wins: number,
  games: number,
  winrate: number,
}
export interface Feature {
  name: string;
  wins: number;
  games: number;
  winrate: number;
}

export interface Data {
  playtime: number;
  wins: number;
  apm: number;
  damage_per_opening: number;
  openings_per_kill: number;
  neutral_win_ratio: number;
  kill_count: number;
  nemesis: { [id: string]: Nemesis };
  stages: { [id: string]: Feature };
  my_chars: { [id: string]: Feature };
  op_chars: { [id: string]: Feature };
}

export type CleanData = {
  playtime: number;
  games: number;
  winrate: number;
  apm: number;
  damage_per_opening: number;
  openings_per_kill: number;
  neutral_win_ratio: number;
  kill_count: number;
  nemesis: Array<Nemesis>;
  stages: Array<Feature>;
  my_chars: Array<Feature>;
  op_chars: Array<Feature>;
};
