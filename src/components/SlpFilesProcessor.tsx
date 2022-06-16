import React, {
  useState,
  useEffect,
}                  from 'react';
import SlpSelector from './SlpSelector';
import LoadingBar  from './LoadingBar';

interface Result {
  metadata: any; //TODO
}

interface SlpFilesProcessorProps {
  results: Array<Result>;
  setResults: React.Dispatch<React.SetStateAction<Array<Result>>>;
  setDoneProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string;
    webkitdirectory?:string;
  }
}

const slippi_worker = new Worker(new URL('../workers/worker.js', import.meta.url));

const SlpFilesProcessor: React.FC<SlpFilesProcessorProps> = ({
  results,
  setResults,
  setDoneProcessing,
}) => {
  const [slp_files, setSlpFiles] = useState<Array<File>>([]);

  // Send files to worker
  useEffect(() => {
    if (slp_files.length) {
      slp_files.forEach(file => slippi_worker.postMessage({ file }));
    }
  }, [slp_files]);

  // Process results received from worker
  useEffect(() => {
    slippi_worker.addEventListener('message', ({ data }) => {
      const { metadata } = data;
      setResults(results => results.concat(metadata));
    });
  }, [setResults]);

  // Mark as done
  useEffect(() => {
    if (slp_files.length && slp_files.length === results.length) {
      setDoneProcessing(true);
    }
  }, [results, slp_files, setDoneProcessing]);

  return (<div>
    <div className="flex" style={{width: '25em', margin: 'auto'}}>
      {slp_files.length === 0 ?
        (<SlpSelector setSlpFiles={setSlpFiles}/>) :
        (<LoadingBar num_files={slp_files.length} num_results={results.length}/>)
      }
    </div>
  </div>);
};
export default SlpFilesProcessor;
