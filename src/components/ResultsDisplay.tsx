import React, {
  useState,
  useEffect,
}                 from 'react';
import { Result } from '../lib/results';

interface ResultsDisplayProps {
  results: Array<Result>;
  codes: Array<string>;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  codes,
}) => {
  return (<div className="flex flex-grow relative" style={{width: '25em', height: '100%'}}>
  </div>);
};
export default ResultsDisplay;
