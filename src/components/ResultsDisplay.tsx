import React, {
  useState,
  useEffect,
  useCallback,
}                    from 'react';
import { CleanData } from '../lib/types';
import {
  sendToGcp,
}                    from '../lib/utils';
import StepDisplay   from './StepDisplay';
import MusicPlayer   from './MusicPlayer';
import {
  PlayTimeDisplay,
  DetailsDisplay,
  CharsDisplay,
  MusDisplay,
  StagesDisplay,
  NemesisDisplay,
  CompleteDisplay,
}                    from './displays/index';
import sadcat        from '../images/sad.jpg';

interface ResultsDisplayProps {
  data: CleanData,
  prev_year_data: CleanData | null,
  slippigg_elo: number | null,
  codes: Array<string>;
  setDone: (done: boolean) => void;
  name: string;
  already_sent: boolean;
  muted: boolean;
}

const NUMBER_STEPS = 6;

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  data,
  prev_year_data,
  slippigg_elo,
  codes,
  setDone,
  name,
  already_sent,
  muted,
}) => {
  const [ main_progress, setMainProgress ] = useState<number>(0);
  const step = Math.floor(main_progress / 100);

  // Mark ending & send to GCP
  useEffect(() => {
    if (main_progress === 100*NUMBER_STEPS) {
      setDone(true);
      if (!already_sent) {
        sendToGcp(data, codes, name);
      }
    }
  }, [main_progress, setDone, data, codes, name, already_sent]);

  const forwardVideo = useCallback(() => {
    setMainProgress(main_progress => {
      const step = Math.floor(main_progress / 100);
      return step*100 + 90;
    });
  }, [setMainProgress]);
  const rewindVideo = useCallback(() => {
    setMainProgress(main_progress => {
      const step = Math.floor(main_progress / 100);
      const relative_progress = main_progress % 100;
      if (relative_progress < 20 && step > 0) {
        return (step-1)*100;
      }
      return step*100;
    });
  }, [setMainProgress]);

  // If no data, display error
  if (!data) return (
    <div style={{textAlign: 'center'}}>
      There was an error processing your data :(<br/>
      <img src={sadcat} alt="sad cat" style={{width: '10em', margin: '1em auto'}}/>
      Could you send your replays to carlos@marah.dev?
    </div>
  );

  return (<div
    className="flex flex-grow relative"
    style={{ width: '100%', height: '100%' }}
  >
    {step < NUMBER_STEPS && (<StepDisplay main_progress={main_progress} setMainProgress={setMainProgress}/>)}
    {step < NUMBER_STEPS && (<MusicPlayer step={step} muted={muted}/>)}
    <div
      className="flex flex-col flex-grow"
      style={{ width: '100%', height: '100%', backgroundColor: 'var(--dark-2)' }}
    >
      {
        (step === 0 && <PlayTimeDisplay data={data} prev_year_data={prev_year_data} main_progress={main_progress}/>) ||
        (step === 1 && <DetailsDisplay data={data} prev_year_data={prev_year_data} main_progress={main_progress}/>) ||
        (step === 2 && <CharsDisplay data={data} prev_year_data={prev_year_data} main_progress={main_progress}/>) ||
        (step === 3 && <MusDisplay data={data} prev_year_data={prev_year_data} main_progress={main_progress}/>) ||
        (step === 4 && <StagesDisplay data={data} prev_year_data={prev_year_data} main_progress={main_progress}/>) ||
        (step === 5 && <NemesisDisplay data={data} prev_year_data={prev_year_data} main_progress={main_progress}/>) ||
                      (<CompleteDisplay data={data} slippigg_elo={slippigg_elo}/>)
      }
      <div className="absolute" onClick={rewindVideo} style={{width: "50%", height: "100%", cursor: "pointer"}}></div>
      <div className="absolute" onClick={forwardVideo} style={{width: "50%", height: "100%", left: '50%', cursor: 'pointer'}}></div>
    </div>
  </div>);
};
export default ResultsDisplay;
