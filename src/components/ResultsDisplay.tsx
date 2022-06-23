import React, {
  useMemo,
  useState,
}                          from 'react';
import { Result, getData } from '../lib/results';
import StepDisplay         from './StepDisplay';
import { PlayTimeDisplay } from './displays/index';

interface ResultsDisplayProps {
  results: Array<Result>;
  codes: Array<string>;
}

const NUMBER_STEPS = 6;

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  codes,
}) => {
  const [ main_progress, setMainProgress ] = useState<number>(0);
  //const step = Math.floor(main_progress / (100 * NUMBER_STEPS));
  const step = Math.floor(main_progress / (100000 * NUMBER_STEPS));

  const data_to_display = useMemo(
    () => getData(results, codes)
  , [results, codes]);

  return (<div className="flex flex-grow relative" style={{
    width: '100%',
    height: '100%',
  }}>
    <StepDisplay setMainProgress={setMainProgress}/>
    {
      (step === 0 && <PlayTimeDisplay data={data_to_display} main_progress={main_progress}/>) ||
      (step === 1 && <PlayTimeDisplay data={data_to_display} main_progress={main_progress}/>) ||
      (step === 2 && <PlayTimeDisplay data={data_to_display} main_progress={main_progress}/>) ||
      (step === 3 && <PlayTimeDisplay data={data_to_display} main_progress={main_progress}/>)
    }
  </div>);
};
export default ResultsDisplay;
