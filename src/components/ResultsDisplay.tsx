import React, {
  useMemo,
} from 'react';
import {
  Result,
  getData,
} from '../lib/results';

interface ResultsDisplayProps {
  results: Array<Result>;
  codes: Array<string>;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  codes,
}) => {
  console.log('RD', results, codes);

  const data_to_display = useMemo(
    () => getData(results, codes)
  , [results, codes]);
  console.log('DTD', data_to_display);

  return (<div className="flex flex-grow relative" style={{width: '25em', height: '100%'}}>
    que tio
  </div>);
};
export default ResultsDisplay;
