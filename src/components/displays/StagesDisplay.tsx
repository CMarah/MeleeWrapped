import { useMemo }   from 'react';
import { CleanData } from '../../lib/types';
import AnimatedText  from '../AnimatedText';
import slippilogo    from '../../images/slippilogo.svg';

interface Props {
  data: CleanData;
  main_progress: number;
};

const WINRATE_MESSAGES = [
  "You've gotta start somewhere, don't give up!",
  "You've gotta start somewhere, don't give up!",
  "You've gotta start somewhere, don't give up!",
  "You're getting there!",
  "You're almost there!",
  "Nice! Keep it up 💪",
  "Now that's some nice consistency 🤩",
  "Now that's some nice consistency 🤩",
  "That's insane, well played!",
  "You're a god!",
  "You're a god!",
];

const getTexts = (data: CleanData) => {
  const { playtime, games, winrate } = data;
  return [
    `2022 was one of the greatest years for Melee`,
    "and even though you know about the pros' stats...",
    "do you know yours?",
    (<span>
      You played a total of
      <span style={{color: "var(--accent-yellow)"}}><b> {games} </b></span>
      games, for a whopping
      <br/>
      <span style={{color: "var(--accent-yellow)"}}><b> {playtime.toLocaleString()} </b></span>
      frames
      <br/>
    </span>),
    (<span>
      That's more than
      <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(playtime/60/60/60)} </b></span>
      hours of Melee!
    </span>),
    (<span>
      Your global winrate was
      <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(winrate * 1000)/10}%</b></span>
      <br/>
      {WINRATE_MESSAGES[Math.floor(winrate * 10)]}
    </span>),
  ];
};

export const StagesDisplay: React.FC<Props> = ({ data, main_progress }) => {
  const partial_progress = main_progress % 100;

  console.log('PP', partial_progress, data);
  const texts = useMemo(() => getTexts(data), [data]);

  return (<div className="flex flex-grow flex-col relative justify-center w-full h-full">
    <AnimatedText content={texts[0]} inProp={partial_progress >= 10} />
    <AnimatedText content={texts[1]} inProp={partial_progress >= 20} />
    <AnimatedText content={texts[2]} inProp={partial_progress >= 35} />
    <div style={{marginBottom: '2.5em'}}></div>
    <AnimatedText content={texts[3]} inProp={partial_progress >= 50} />
    <div style={{marginBottom: '3.5em'}}></div>
    <AnimatedText content={texts[4]} inProp={partial_progress >= 70} />
    <img src={slippilogo} alt="" style={{ width: "20em", opacity: "0.5", position: "absolute", bottom: "-5em", right: "-3em" }}/>
  </div>);
};
