import React, {
  useState,
  useEffect,
}                  from 'react';
import SlpSelector from './SlpSelector';
import LoadingBar  from './LoadingBar';
import { Result }  from '../lib/results';

interface SlpFilesProcessorProps {
  setFullResults: React.Dispatch<React.SetStateAction<Array<Result>>>;
}

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string;
    webkitdirectory?:string;
  }
}

const slippi_workers = [
  new Worker(new URL('../lib/worker.js', import.meta.url)),
  new Worker(new URL('../lib/worker.js', import.meta.url)),
  new Worker(new URL('../lib/worker.js', import.meta.url)),
  new Worker(new URL('../lib/worker.js', import.meta.url)),
  new Worker(new URL('../lib/worker.js', import.meta.url)),
  new Worker(new URL('../lib/worker.js', import.meta.url)),
  new Worker(new URL('../lib/worker.js', import.meta.url)),
  new Worker(new URL('../lib/worker.js', import.meta.url)),
];

const SlpFilesProcessor: React.FC<SlpFilesProcessorProps> = ({
  setFullResults,
}) => {
  const [slp_files, setSlpFiles] = useState<Array<File>>([]);
  const [results, setResults ]   = useState<Array<Result>>([]);

  // Send files to worker
  useEffect(() => {
    if (slp_files.length) {
      slp_files.forEach((file, i) => slippi_workers[i%slippi_workers.length].postMessage({ file }));
    }
  }, [slp_files]);

  // Process results received from worker
  useEffect(() => {
    slippi_workers.forEach(slippi_worker => {
      slippi_worker.addEventListener('message', ({ data }) => {
        setResults(results => results.concat(data));
      });
    });
  }, [setResults]);

  // Mark as done
  useEffect(() => {
    if (slp_files.length && slp_files.length === results.length) {
      setFullResults(results);
    }
  }, [results, slp_files, setFullResults]);

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
