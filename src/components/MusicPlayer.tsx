import {
  useEffect,
} from 'react';

const corneria   = require('../music/corneria.mp3');
const allstar    = require('../music/allstar.mp3');
// const earthbound = require('../music/earthbound.mp3');
const mother     = require('../music/mother.mp3');
const mother2    = require('../music/mother2.mp3');
const saria      = require('../music/saria.mp3');
const targets    = require('../music/targets.mp3');
const trophy     = require('../music/trophy.mp3');
const yoshis     = require('../music/yoshis.mp3');

type SongToStep = {
  [key: number]: string;
};

const song_changes: SongToStep = {
  0: allstar,
  2: mother,
  3: mother2,
  4: saria,
  5: targets,
  6: trophy,
  7: yoshis,
  8: corneria,
};
let song: HTMLAudioElement = new Audio(allstar);
song.volume = 0.4;

interface MusicPlayerProps {
  step: number;
  muted: boolean;
}

// We may want to fade music out

const MusicPlayer: React.FC<MusicPlayerProps> = ({ step, muted }) => {

  useEffect(() => {
    if (step in song_changes) {
      if (song) song.pause();
      song.src = song_changes[step];
      song.loop = true;
      if (song) song.play();
    }
  }, [step]);
  useEffect(() => {
    if (song) song.volume = muted ? 0 : 0.4;
  }, [muted]);

  return (<div></div>);
};
export default MusicPlayer;
