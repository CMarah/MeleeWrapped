import './App.css';
import { useState }        from 'react';
import SlpFilesProcessor   from './components/SlpFilesProcessor';
import CodeInput           from './components/CodeInput';
import ResultsDisplay      from './components/ResultsDisplay';
import Footer              from './components/Footer';
import StartConfirmation   from './components/StartConfirmation';
import { Result }          from './lib/types';
import slippilogo          from './images/slippilogo.svg';

const App = () => {
  const [ results, setResults ] = useState<Array<Result>>([]);
  const [ codes, setCodes     ] = useState<Array<string>>([]);
  const [ started, setStarted ] = useState(false);

  return (<div className="App">
    <div className="App-header">
      <div className="text-2xl flex" style={{gap: "0.5em"}}>
        <img src={slippilogo} alt="" style={{width: "1.5em"}}/>
        Melee Wrapped
      </div>
    </div>
    <div className="App-body"><div>
      <div className="subtitle">Explore your Melee 2022</div>
      <div
        className={`content ${codes.length === 0 ? 'content-empty' : 'content-full'}`}
        style={{
          height: !results.length ? '12em' :
                  !started ?        '18em' :
                                    'calc(32em * 16 / 9)',
          overflow: !results.length ? '' : 'hidden',
        }}
      >
        <div className="flex flex-grow items-center justify-center" style={{width: '100%'}}>{
          results.length === 0 ? (<SlpFilesProcessor setFullResults={setResults}/>) :
          codes.length === 0 ?   (<CodeInput results={results} setCodes={setCodes}/>) :
          !started ?             (<StartConfirmation setStarted={setStarted} />) :
                                 (<ResultsDisplay results={results} codes={codes}/>)
        }</div>
      </div>
    </div></div>
    <Footer/>
  </div>);
};
export default App;
