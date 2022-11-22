import './App.css';
import {
  useState,
  useRef,
  useCallback,
}                          from 'react';
import { toBlob }          from 'html-to-image';
import SlpFilesProcessor   from './components/SlpFilesProcessor';
import CodeInput           from './components/CodeInput';
import ResultsDisplay      from './components/ResultsDisplay';
import Footer              from './components/Footer';
import StartConfirmation   from './components/StartConfirmation';
import Sharer              from './components/Sharer';
import { Result }          from './lib/types';
import slippilogo          from './images/slippilogo.svg';

const App = () => {
  // Basic data
  const [ results, setResults ] = useState<Array<Result>>([]);
  const [ codes, setCodes     ] = useState<Array<string>>([]);
  const [ name, setName       ] = useState<string>('');
  const [ started, setStarted ] = useState(false);
  const [ done, setDone       ] = useState(false);

  // Share screenshot logic
  const main_ref = useRef<HTMLDivElement>(null);
  const takeScreenshot = useCallback(() => {
    if (!done || !main_ref.current) return;
    toBlob(main_ref.current)
      .then(blob => {
        if (blob) {
          const type = blob.type;
          navigator.clipboard.write([
            new ClipboardItem({ [type]: blob })
          ]);
        }
      })
      .catch((err) => {
        console.log('Error rendering image:', err);
      });
  }, [done, main_ref]);

  return (<div className="App">
    <div className="App-header">
      <div className="text-2xl flex" style={{gap: "0.5em"}}>
        <img src={slippilogo} alt="" style={{width: "1.5em"}}/>
        Melee Wrapped
      </div>
    </div>
    <div className="App-body">
      <div className="screenshot-area" ref={main_ref}>
        {!done && (<div className="subtitle">Explore your Melee 2022</div>)}
        <div
          className="content"
          style={{
            height: !results.length ? '16em' :
                    !started ? '18em' :
                    !done ? 'calc(32em * 16 / 9)' : 'calc(64em * 9 / 16)',
            width:  done ? '64em' : '32em',
            overflow: !results.length ? '' : 'hidden',
          }}
        >
          <div className="flex flex-grow items-center justify-center" style={{width: '100%'}}>{
            results.length === 0 ? (<SlpFilesProcessor setFullResults={setResults}/>) :
            codes.length === 0 ?   (<CodeInput results={results} setCodes={setCodes} setName={setName}/>) :
            !started ?             (<StartConfirmation setStarted={setStarted} />) :
                                   (<ResultsDisplay results={results} codes={codes} setDone={setDone} name={name}/>)
          }</div>
        </div>
      </div>
      {done && (<Sharer takeScreenshot={takeScreenshot}/>)}
    </div>
    <Footer/>
  </div>);
};
export default App;
