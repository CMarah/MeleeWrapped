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
  const [ name, setName       ] = useState<string>('');
  const [ started, setStarted ] = useState(false);
  const [ done, setDone       ] = useState(false);

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
    </div></div>
    <Footer/>
  </div>);
};
export default App;
