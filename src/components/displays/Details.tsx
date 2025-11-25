import { useMemo }       from 'react';
import { CSSTransition } from 'react-transition-group';
import { CleanData }     from '../../lib/types';
import AnimatedText      from '../AnimatedText';
import CornerIcon        from './CornerIcon';

interface Props {
  data: CleanData;
  prev_year_data: CleanData | null;
  main_progress: number;
  current_year: number;
};

const APM_MESSAGES = [
  "Slow and steady wins the race 🐢",
  "You're getting the hang of it! 🤖",
  "Not bad at all! 🦈",
  "That's pretty fast! 🐆",
  "Pretty fast 🐉",
  "Is that even possible? 🚀",
  "Is that even possible? 🚀",
  "Is that even possible? 🚀",
  "Is that even possible? 🚀",
  "Is that even possible? 🚀",
  "Is that even possible? 🚀",
];

const getTexts = (data: CleanData, prev_year_data: CleanData | null, current_year: number) => {
  const {
    apm,
    damage_per_opening,
    neutral_win_ratio,
    openings_per_kill,
    kill_count,
  } = data;
  if (prev_year_data && prev_year_data.apm) {
    return [
      `Let's see some details.`,
      (<span>
        Throughout {current_year}, you averaged <br/>
        <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(apm)} </b></span>
        actions per minute
        {apm > (prev_year_data.apm + 4) && `, ${Math.floor(apm - prev_year_data.apm)} more than last year.`}.
        <br/>
      </span>),
      (<span>
        {APM_MESSAGES[Math.floor(apm/100)]}
      </span>),
      (<span>
        You won neutral on 
        <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(neutral_win_ratio * 1000)/10}% </b></span>
        of your exchanges.<br/>
      </span>),
      (<span>
        When you did, you got an average
        <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(damage_per_opening)}% </b></span>
        out of it.
        <br/>
      </span>),
      (<span>
        Finally, your global Openings per Kill was
        <br/>
        <span style={{color: "var(--accent-yellow)", fontSize: '1.3em'}}><b> {Math.floor(openings_per_kill * 10)/10} </b></span>
        <br/>
      </span>),
      (<span>
        for a total of 
        <span style={{color: "var(--accent-yellow)"}}><b> {kill_count} </b></span>
        kills.
      </span>),
      openings_per_kill < (prev_year_data.openings_per_kill + 0.1) &&
        (<span>
          Your OPK is <span style={{color: "var(--accent-yellow)"}}><b> 
            {Math.floor((prev_year_data.openings_per_kill - openings_per_kill) * 10) / 10}
          </b></span> less than last year, nice!
        </span>),
    ];
  }
  return [
    `Let's see some details.`,
    (<span>
      Throughout {current_year}, you averaged <br/>
      <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(apm)} </b></span>
      actions per minute.
      <br/>
    </span>),
    (<span>
      {APM_MESSAGES[Math.floor(apm/100)]}
    </span>),
    (<span>
      You won neutral on 
      <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(neutral_win_ratio * 1000)/10}% </b></span>
      of your exchanges.<br/>
    </span>),
    (<span>
      When you did, you got an average
      <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(damage_per_opening)}% </b></span>
      out of it.
      <br/>
    </span>),
    (<span>
      Finally, your global Openings per Kill was
      <br/>
      <span style={{color: "var(--accent-yellow)", fontSize: '1.3em'}}><b> {Math.floor(openings_per_kill * 10)/10} </b></span>
      <br/>
    </span>),
    (<span>
      for a total of 
      <span style={{color: "var(--accent-yellow)"}}><b> {kill_count} </b></span>
      kills.
    </span>),
  ];
};

export const DetailsDisplay: React.FC<Props> = ({ data, prev_year_data, main_progress, current_year }) => {
  const partial_progress = main_progress % 100;

  const texts = useMemo(() => getTexts(data, prev_year_data, current_year), [data, prev_year_data, current_year]);

  return (<>
    <CSSTransition
      in={partial_progress <= 90}
      timeout={500}
      classNames="slideanimation"
      unmountOnExit
    >
      <div className="flex flex-col relative w-full h-full">
        <div style={{marginBottom: '8.5em'}}></div>
        <AnimatedText content={texts[0]} inProp={partial_progress >= 5} />
        <div style={{marginBottom: '2.5em'}}></div>
        <AnimatedText content={texts[1]} inProp={partial_progress >= 15} />
        <AnimatedText content={texts[2]} inProp={partial_progress >= 25} />
        <div style={{marginBottom: '3.5em'}}></div>
        <AnimatedText content={texts[3]} inProp={partial_progress >= 35} />
        <AnimatedText content={texts[4]} inProp={partial_progress >= 45} />
        <div style={{marginBottom: '2.5em'}}></div>
        <AnimatedText content={texts[5]} inProp={partial_progress >= 55} />
        <AnimatedText content={texts[6]} inProp={partial_progress >= 65} />
        <AnimatedText content={texts[7]} inProp={partial_progress >= 70} />
        <div style={{marginBottom: '2.5em'}}></div>
      </div>
    </CSSTransition>
    <CornerIcon char_name={''}/>
  </>);
};
