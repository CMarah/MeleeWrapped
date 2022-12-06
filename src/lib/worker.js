import { SlippiGame } from "@slippi/slippi-js";

declare var FileReaderSync: any;
declare var self: any;

const invalidMetadata = metadata => {
  if (!metadata || !metadata.lastFrame) return true;
  if (metadata.lastFrame < 60*40) return true;
  if (!metadata.startAt.startsWith('2022')) return true;
  if (Object.keys(metadata.players).length !== 2) return true;
  if (!metadata.players[0]?.names?.netplay) return true;
  if (!metadata.players[0]?.names?.code)    return true;
  if (!metadata.players[1]?.names?.netplay) return true;
  if (!metadata.players[1]?.names?.code)    return true;
  return false;
};

const VALID_STAGE_IDs = [2, 3, 8, 28, 31, 32];
const invalidStats = ({ settings, stocks, inputs }) => {
  if (settings.is_teams) return true;
  if (!VALID_STAGE_IDs.includes(settings.stageId)) return true;
  if (![2, 8].includes(settings.gameMode)) return true;

  // Check if both players had 2+ stocks at the end
  const p0_deaths = stocks.filter(s => s.playerIndex === 0 && s.endFrame).length;
  const p1_deaths = stocks.filter(s => s.playerIndex === 1 && s.endFrame).length;
  if (p0_deaths <= 2 && p1_deaths <= 2) return true;

  // Check if when quitting out, both players where grounded
  const player_0_airborne = inputs[0].airborne;
  const player_1_airborne = inputs[1].airborne;
  if (!player_0_airborne && !player_1_airborne) return true;

  return false;
};

const reader = new FileReaderSync();
const processGame = file => {
  const result = reader.readAsArrayBuffer(file);
  const game = new SlippiGame(new Uint8Array(result));

  try {
    const metadata = game.getMetadata();
    if (invalidMetadata(metadata)) return null;
    const stats = game.getStats();
    if (invalidStats(stats)) return null;

    return {
      metadata,
      stats,
    };
  } catch (e) {
    console.log('SLIPPI-JS ERROR:', e);
    return null;
  }
};

self.onmessage = async ({ data }) => {
  const file = data.file;
  const result = processGame(file);
  self.postMessage(result);
};
