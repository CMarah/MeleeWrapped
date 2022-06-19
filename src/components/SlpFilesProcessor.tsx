import React, {
  useState,
  useEffect,
}                     from 'react';
import SlpSelector    from './SlpSelector';
import LoadingBar     from './LoadingBar';
import { Result }     from '../lib/results';
import yellow_icons_1 from '../images/yellow-icons-1.svg';

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

  // TODO amarillines que desaparezcan despacio
  return (<div className="flex flex-grow relative" style={{width: '25em', height: '100%'}}>
    <div className='absolute' style={{ right: '-6em', top: '-2em'}}>
      <img src={yellow_icons_1} alt=""/>
    </div>
    <div className='absolute' style={{ left: '-6em', bottom: '-3em'}}>
      <img src={yellow_icons_1} alt="" style={{transform: 'rotate(180deg)'}}/>
    </div>
    {slp_files.length === 0 ?
      (<SlpSelector setSlpFiles={setSlpFiles}/>) :
      (<LoadingBar num_files={slp_files.length} num_results={results.length}/>)
    }
  </div>);
};
export default SlpFilesProcessor;
