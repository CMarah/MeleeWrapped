import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
}                  from 'react';
import { toBlob }  from 'html-to-image';
import { Result }  from '../lib/types';
import { getData } from '../lib/results';
import StepDisplay from './StepDisplay';
import {
  PlayTimeDisplay,
  CharsDisplay,
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

  // Save images of each of the displays
  const main_ref = useRef<HTMLDivElement>(null)
  const [ display_images, setDisplayImages ] = useState<Array<Blob>>([]);
  useEffect(() => {
    // Save it at the end of each step
    if (main_ref.current && [90, 190, 290, 390].includes(main_progress)) {
      toBlob(main_ref.current)
        .then(blob => {
          if (blob) {
            setDisplayImages((prev) => [...prev, blob]);
          }
        })
        .catch((err) => {
          console.log('Error rendering image:', err);
        });
    }
  }, [main_progress, main_ref]);

  useEffect(() => {
    if (main_progress === 400) {
      setDone(true);
      console.log('wa', display_images);
      // navigator.clipboard.write(display_images.map(
      //   blob => new ClipboardItem({ [blob.type]: blob })
      // ));
      const type = display_images[0].type;
      navigator.clipboard.write([
        new ClipboardItem({ [type]: display_images[0] })
      ]);
    }
  }, [display_images, main_progress, setDone]);

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
    <StepDisplay setMainProgress={setMainProgress}/>
    <div
      ref={main_ref}
      className="flex flex-col flex-grow"
      style={{ width: '100%', height: '100%', backgroundColor: '#433365' }}
    >
      {
        (step === 0 && <PlayTimeDisplay data={data_to_display} main_progress={main_progress}/>) ||
        (step === 1 && <CharsDisplay data={data_to_display} main_progress={main_progress}/>) ||
        (step === 2 && <StagesDisplay data={data_to_display} main_progress={main_progress}/>) ||
        (step === 3 && <NemesisDisplay data={data_to_display} main_progress={main_progress}/>) ||
                      (<CompleteDisplay data={data_to_display}/>)
      }
    </div>
  </div>);
};
export default ResultsDisplay;
