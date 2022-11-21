import React, {
  useState,
  useEffect,
  useMemo,
}                 from 'react';
import { Result } from '../lib/types';
import {
  getAllCodes,
  getName,
}                 from '../lib/codes';

interface CodeInputProps {
  results: Array<Result>;
  setCodes: React.Dispatch<React.SetStateAction<Array<string>>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const CodeInput: React.FC<CodeInputProps> = ({
  results,
  setCodes,
  setName,
}) => {
  const [ selected_codes, setSelectedCodes ] = useState<Array<string>>([]);

  const all_codes = useMemo(
    () => getAllCodes(results)
  , [results]);
  const sorted_codes = useMemo(
    () => Object.entries(all_codes).sort((a: any, b: any) => b[1] - a[1])
  , [all_codes]);

  useEffect(() => {
    const best_code = sorted_codes[0];
    // Only one option, choose that one
    if (best_code[1] === results.length) {
      const name = getName(results, [best_code[0]]);
      setCodes([best_code[0]]);
      setName(name);
    }
  }, [results, setCodes, sorted_codes, setName]);

  const codeButtonOnClick = (code: string) => {
    if (selected_codes.includes(code)) {
      setSelectedCodes(selected_codes.filter(c => c !== code));
    } else {
      setSelectedCodes(selected_codes.concat(code));
    }
  };

  const acceptSelection = () => {
    const name = getName(results, selected_codes);
    setCodes(selected_codes);
    setName(name);
  };
  
  return (<div className="flex flex-grow flex-col relative items-center" style={{width: '25em', height: '100%'}}>
    <div style={{
      margin: '2em 0',
      fontSize: '1.4em',
    }}>
      Which of these codes are yours?
    </div>
    <div className="flex flex-row" style={{width: '100%'}}>
      {sorted_codes.slice(0,4).map(([code]) => (<div
        key={code}
        className="code-btn"
        style={{
          margin: 'auto',
          border: selected_codes.includes(code) ?
            '2px solid var(--accent-yellow)' :
            '2px solid transparent',
        }}
        onClick={() => codeButtonOnClick(code)}
      >{code}</div>))}
    </div>
    <div className="code-btn"
      onClick={() => acceptSelection()}
      style={{
        width: '5em',
        cursor: selected_codes.length ? 'cursor' : '',
        opacity: selected_codes.length ? '1' : '0.6',
      }}
    >Done</div>
  </div>);
};
export default CodeInput;
