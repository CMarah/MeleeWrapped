import { useMemo }       from 'react';
import { CSSTransition } from 'react-transition-group';
import { CleanData }     from '../../lib/types';
import AnimatedText      from '../AnimatedText';
import CornerIcon        from './CornerIcon';

interface Props {
  data: CleanData;
  prev_year_data: CleanData | null;
  main_progress: number;
};

const WINRATE_MESSAGES = [
  "Don't give up! 🚀",
  "Don't give up! 🚀",
  "Don't give up! 🚀",
  "You're getting there! 🔝",
  "You're almost there! 🔥",
  "Nice! Keep it up 💪",
  "Nice consistency! 🤩",
  "Great consistency! 🤩",
  "Insane! Well played 🎉",
  "You're a god! 👑",
  "You're a god! 👑",
];

const getTexts = (data: CleanData, prev_year_data: CleanData | null) => {
  const { playtime, games, winrate } = data;
  if (prev_year_data && prev_year_data.playtime && prev_year_data.games) {
    const { playtime: prev_playtime, games: prev_games, winrate: prev_winrate } = prev_year_data;
    const playtime_diff = playtime - prev_playtime;
    const games_diff = games - prev_games;
    const winrate_diff = winrate - prev_winrate;
    return [
      `2024 was another great year for Melee,`,
      "but how did you do these past 12 months?",
      games_diff > 0 ? (
        <span>
          You played a whopping <span style={{color: "var(--accent-yellow)"}}><b> {games} </b></span>
          games, <br/> <span style={{color: "var(--accent-yellow)"}}><b> {games_diff} </b></span>
          more than last year.<br/>
          In total, this adds up to
          <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(playtime/60/60/60)} </b></span>
          hours of Melee!
          <br/>
        </span>
      ) : playtime_diff/playtime > 0.2 ? (
        <span>
          You played a total of
          <span style={{color: "var(--accent-yellow)"}}><b> {games} </b></span>
          games, for a <br/> whopping
          <span style={{color: "var(--accent-yellow)"}}><b> {playtime.toLocaleString()} </b></span>
          frames.<br/>That's more than
          <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(playtime/60/60/60)} </b></span>
          hours of Melee!
          <br/>
          <br/>
          <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(playtime_diff/prev_playtime * 1000)/10}% </b></span>
          more than in 2023, great job 🐸
        </span>
      ) : (
        <span>
          You played a total of
          <span style={{color: "var(--accent-yellow)"}}><b> {games} </b></span>
          games, for a <br/> whopping
          <span style={{color: "var(--accent-yellow)"}}><b> {playtime.toLocaleString()} </b></span>
          frames.<br/>That's more than
          <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(playtime/60/60/60)} </b></span>
          hours of Melee!
          <br/>
        </span>
      ),
      (<span>
        Your global winrate was
        <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(winrate * 1000)/10}%</b></span>.
        <br/>
      </span>),
      (<span>
        {winrate_diff > 0.05 && (<><span>That's a
          <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(winrate_diff * 1000)/10}% </b></span>
        improvement over 2023.</span><br/></>)}
        <span>{WINRATE_MESSAGES[Math.floor(winrate * 10)]}</span>
      </span>),
    ];
  }
  return [
    `2024 was another great year for Melee,`,
    "but how did you do these past 12 months?",
    (<span>
      You played a total of
      <span style={{color: "var(--accent-yellow)"}}><b> {games} </b></span>
      games, for a <br/> whopping
      <span style={{color: "var(--accent-yellow)"}}><b> {playtime.toLocaleString()} </b></span>
      frames.<br/>That's more than
      <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(playtime/60/60/60)} </b></span>
      hours of Melee!
      <br/>
    </span>),
    (<span>
      Your global winrate was
      <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(winrate * 1000)/10}%</b></span>
      <br/>
    </span>),
    (<span>
      {WINRATE_MESSAGES[Math.floor(winrate * 10)]}
    </span>),
  ];
};

export const PlayTimeDisplay: React.FC<Props> = ({ data, prev_year_data, main_progress }) => {
  const partial_progress = main_progress % 100;

  const texts = useMemo(() => getTexts(data, prev_year_data), [data, prev_year_data]);

  return (<>
    <CSSTransition
      in={partial_progress <= 90}
      timeout={500}
      classNames="slideanimation"
      unmountOnExit
    >
      <div className="flex flex-col relative w-full h-full">
        <div style={{marginBottom: '8.5em'}}></div>
        <AnimatedText content={texts[0]} inProp={partial_progress >= 10} />
        <AnimatedText content={texts[1]} inProp={partial_progress >= 20} />
        <div style={{marginBottom: '2.5em'}}></div>
        <AnimatedText content={texts[2]} inProp={partial_progress >= 40} />
        <div style={{marginBottom: '3.5em'}}></div>
        <AnimatedText content={texts[3]} inProp={partial_progress >= 65} />
        <AnimatedText content={texts[4]} inProp={partial_progress >= 75} />
        <div style={{marginBottom: '2.5em'}}></div>
      </div>
    </CSSTransition>
    <CornerIcon char_name={''}/>
  </>);
};
