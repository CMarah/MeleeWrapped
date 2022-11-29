import React, {
  useMemo,
  useState,
  useEffect,
}                  from 'react';
import { Result }  from '../lib/types';
import { getData } from '../lib/results';
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
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  codes,
  setDone,
}) => {
  const [ main_progress, setMainProgress ] = useState<number>(0);
  const step = Math.floor(main_progress / 100);

  useEffect(() => {
    if (main_progress === 500) {
      setDone(true);
    }
  }, [main_progress, setDone]);

  const data_to_display = useMemo(
    () => getData(results, codes)
  , [results, codes]);

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
    {step <= 4 && (<StepDisplay setMainProgress={setMainProgress}/>)}
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
