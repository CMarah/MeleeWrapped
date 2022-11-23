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
import yellow_icons_1      from './images/yellow-icons-1.svg';

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
        if (!blob) return;
        const type = blob.type;
        navigator.clipboard.write([
          new ClipboardItem({ [type]: blob })
        ]);
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
      {done && (<Sharer takeScreenshot={takeScreenshot}/>)}
    </div>
    <Footer/>
  </div>);
};
export default App;
