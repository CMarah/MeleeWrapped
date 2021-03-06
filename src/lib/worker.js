import { SlippiGame } from "@slippi/slippi-js";

declare var FileReaderSync: any;
declare var self: any;

const invalidMetadata = metadata => {
  if (metadata.lastFrame < 60*40) return true;
  if (Object.keys(metadata.players).length !== 2) return true;
  if (!metadata.players[0]?.names?.netplay) return true;
  if (!metadata.players[0]?.names?.code)    return true;
  if (!metadata.players[1]?.names?.netplay) return true;
  if (!metadata.players[1]?.names?.code)    return true;
  // TODO ICs, filter only 2022?
  return false;
};

const invalidStats = ({ settings, stocks, inputs }) => {
  // TODO que esté TODA la info que usamos, revisar stats
  try {
    if (settings.is_teams) return true;
    if (settings.stageId > 32) return true;
    if (![2, 8].includes(settings.gameMode)) return true;
    // Check if both players had 2+ stocks at the end
    const p0_deaths = stocks.filter(s => s.playerIndex === 0 && s.endFrame).length;
    const p1_deaths = stocks.filter(s => s.playerIndex === 1 && s.endFrame).length;
    if (p0_deaths <= 2 && p1_deaths <= 2) return true;

    const player_0_airborne = inputs[0].airborne;
    const player_1_airborne = inputs[1].airborne;
    if (!player_0_airborne && !player_1_airborne) return true;

    return false;
  } catch (e) {
    return true;
  }
};


const reader = new FileReaderSync();
const processGame = file => {
  const result = reader.readAsArrayBuffer(file);
  const game = new SlippiGame(new Uint8Array(result));

  const metadata = game.getMetadata();
  if (invalidMetadata(metadata)) return null;
  const stats = game.getStats();
  if (invalidStats(stats)) return null;

  return {
    metadata,
    stats,
  };
};

self.onmessage = async ({ data }) => {
  const file = data.file;
  const result = processGame(file);
  self.postMessage(result);
};
