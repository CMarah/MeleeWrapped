import React, {
  useMemo,
  useState,
}                          from 'react';
import { Result }          from '../lib/types';
import { getData }         from '../lib/results';
import StepDisplay         from './StepDisplay';
import {
  // PlayTimeDisplay,
  // CharsDisplay,
  StagesDisplay,
  // NemesisDisplay,
}                          from './displays/index';
import sadcat              from '../images/sad.jpg';

interface ResultsDisplayProps {
  results: Array<Result>;
  codes: Array<string>;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  codes,
}) => {
  const [ main_progress, setMainProgress ] = useState<number>(0);
  const step = Math.floor(main_progress / 100);

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

  return (<div className="flex flex-grow relative" style={{
    width: '100%',
    height: '100%',
  }}>
    <StepDisplay setMainProgress={setMainProgress}/>
    {
      (step >= 0 && <StagesDisplay data={data_to_display} main_progress={main_progress}/>) ||
      (<div>Done</div>)
    }
  </div>);
};
export default ResultsDisplay;
