import { SlippiGame } from "@slippi/slippi-js";

declare var FileReaderSync: any;
declare var self: any;


const reader = new FileReaderSync();
const processGame = file => {
  const result = reader.readAsArrayBuffer(file);
  console.log('R', result);
  const game = new SlippiGame(new Uint8Array(result));
  console.log("G", game);
  const metadata = game.getMetadata();
  console.log("metadata", metadata);
  const stats = game.getStats();
  console.log("conv", stats);
};

self.onmessage = async ({ data }) => {
  console.log('E', data);
  const file = data.file;
  processGame(file);
};
