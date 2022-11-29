import React, {
  useMemo,
  useState,
  useEffect,
}                  from 'react';
import { Result }  from '../lib/types';
import { getData } from '../lib/results';
import {
  sendToGcp,
}                  from '../lib/utils';
import StepDisplay from './StepDisplay';
import {
  PlayTimeDisplay,
  DetailsDisplay,
  CharsDisplay,
  MusDisplay,
  StagesDisplay,
  NemesisDisplay,
  CompleteDisplay,
}                  from './displays/index';
import sadcat      from '../images/sad.jpg';

interface ResultsDisplayProps {
  results: Array<Result>;
  codes: Array<string>;
  setDone: (done: boolean) => void;
  name: string;
}

const NUMBER_STEPS = 6;

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  codes,
  setDone,
  name,
}) => {
  const [ main_progress, setMainProgress ] = useState<number>(0);
  const step = Math.floor(main_progress / 100);

  const data_to_display = useMemo(
    () => getData(results, codes)
  , [results, codes]);

  // Mark ending & send to GCP
  useEffect(() => {
    if (main_progress === 100*NUMBER_STEPS) {
      setDone(true);
      sendToGcp(data_to_display, codes, name);
    }
  }, [main_progress, setDone, data_to_display, codes, name]);

  // If no data, display error
  if (!data_to_display) return (
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
    {step <= NUMBER_STEPS && (<StepDisplay setMainProgress={setMainProgress}/>)}
    <div
      className="flex flex-col flex-grow"
      style={{ width: '100%', height: '100%', backgroundColor: '#433365' }}
    >
      {
        (step === 0 && <PlayTimeDisplay data={data_to_display} main_progress={main_progress}/>) ||
        (step === 1 && <DetailsDisplay data={data_to_display} main_progress={main_progress}/>) ||
        (step === 2 && <CharsDisplay data={data_to_display} main_progress={main_progress}/>) ||
        (step === 3 && <MusDisplay data={data_to_display} main_progress={main_progress}/>) ||
        (step === 4 && <StagesDisplay data={data_to_display} main_progress={main_progress}/>) ||
        (step === 5 && <NemesisDisplay data={data_to_display} main_progress={main_progress}/>) ||
                      (<CompleteDisplay data={data_to_display}/>)
      }
    </div>
  </div>);
};
export default ResultsDisplay;
