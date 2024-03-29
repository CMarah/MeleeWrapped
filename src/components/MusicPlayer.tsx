import {
  useEffect,
} from 'react';

const allstar    = require('../music/allstar.mp3');
const mother2    = require('../music/mother2.mp3');
const yoshis     = require('../music/yoshis.mp3');
const targets    = require('../music/targets.mp3');
const trophy     = require('../music/trophy.mp3');

type SongToStep = {
  [key: number]: string;
};

const song_changes: SongToStep = {
  0: allstar,
  1: mother2,
  3: yoshis,
  5: targets,
  6: trophy,
};
let song: HTMLAudioElement = new Audio(allstar);
song.volume = 0.25;

interface MusicPlayerProps {
  step: number;
  muted: boolean;
}

// We may want to fade music out

const MusicPlayer: React.FC<MusicPlayerProps> = ({ step, muted }) => {

  useEffect(() => {
    // Change music
    if (step in song_changes) {
      if (song) song.pause();
      song.src = song_changes[step];
      song.loop = true;
      if (song) song.play();
    }
  }, [step]);

  useEffect(() => {
    // Mute/unmute music
    if (song) song.volume = muted ? 0 : 0.25;
  }, [muted]);

  useEffect(() => {
    // Turn off music when unmounting
    return () => {
      if (song) song.pause();
    }
  }, []);

  return (<div></div>);
};
export default MusicPlayer;
