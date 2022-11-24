import './App.css';
import {
  useState,
  useRef,
  useCallback,
  useEffect,
}                          from 'react';
import SlpFilesProcessor   from './components/SlpFilesProcessor';
import CodeInput           from './components/CodeInput';
import ResultsDisplay      from './components/ResultsDisplay';
import Footer              from './components/Footer';
import StartConfirmation   from './components/StartConfirmation';
import Sharer              from './components/Sharer';
import { Result }          from './lib/types';
import slippilogo          from './images/slippilogo.svg';
import yellow_icons_1      from './images/yellow-icons-1.svg';
import {
  screenshotAndCopy,
  toBase64,
}                          from './lib/utils';

const App = () => {
  // Basic data
  const [ results, setResults ] = useState<Array<Result>>([]);
  const [ codes, setCodes     ] = useState<Array<string>>([]);
  const [ name, setName       ] = useState<string>('');
  const [ started, setStarted ] = useState(false);
  const [ done, setDone       ] = useState(false);

  // Screenshot logic
  const main_ref = useRef<HTMLDivElement>(null);
  const [ screenshot, setScreenshot ] = useState<string>('');
  const [ screenshot_blob, setScreenshotBlob ] = useState<Blob>(new Blob());
  const takeScreenshot = useCallback(() => {
    if (!main_ref.current) return null;
    return screenshotAndCopy(main_ref.current);
  }, [main_ref]);
  useEffect(() => {
    // When done, set screenshot after 1 sec
    if (done) setTimeout(async () => {
      const blob = await takeScreenshot();
      setScreenshotBlob(blob || new Blob());
      toBase64(blob).then(setScreenshot);
    }, 1000);
  }, [done, setScreenshot, takeScreenshot]);

  return (<div className="App">
    <div className="App-header">
      <div className="text-2xl flex" style={{gap: "0.5em"}}>
        <img src={slippilogo} alt="" style={{width: "1.5em"}}/>
        Melee Wrapped
      </div>
    </div>
    <div className="App-body">
      <div className="screenshot-area" ref={main_ref}>
        {!started && (<div className="subtitle">Explore your Melee 2022</div>)}
        <div
          className="content relative"
          style={{
            height: !results.length ? '16em' :
                    !started ? '18em' :
                    !done ? 'calc(32em * 16 / 9)' : 'calc(64em * 9 / 16)',
            width:  done ? '64em' : '32em',
          }}
        >
          <div className='absolute' style={{ right: '-4em', top: '-2em'}}>
            <img src={yellow_icons_1} alt=""/>
          </div>
          <div className='absolute' style={{ left: '-4em', bottom: '-3em'}}>
            <img src={yellow_icons_1} alt="" style={{transform: 'rotate(180deg)'}}/>
          </div>
          <div className="flex flex-grow items-center justify-center" style={{
            overflow: !results.length ? '' : 'hidden',
            width: '100%',
          }}>{
            results.length === 0 ? (<SlpFilesProcessor setFullResults={setResults}/>) :
            codes.length === 0 ?   (<CodeInput results={results} setCodes={setCodes} setName={setName}/>) :
            !started ?             (<StartConfirmation setStarted={setStarted} />) :
                                   (<ResultsDisplay results={results} codes={codes} setDone={setDone} name={name}/>)
          }</div>
        </div>
      </div>
      {(<Sharer takeScreenshot={takeScreenshot} screenshot={screenshot} screenshot_blob={screenshot_blob}/>)}
    </div>
    <Footer/>
  </div>);
};
export default App;
