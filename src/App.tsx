import './App.css';
import { useState }        from 'react';
import SlpFilesProcessor   from './components/SlpFilesProcessor';
import CodeInput           from './components/CodeInput';
import ResultsDisplay      from './components/ResultsDisplay';
import Footer              from './components/Footer';
import { Result }          from './lib/types';

const App = () => {
  const [ results, setResults ] = useState<Array<Result>>([]);
  const [ codes, setCodes     ] = useState<Array<string>>([]);

  return (<div className="App">
    <div className="App-header">
      <p className="text-2xl">Melee Wrapped</p>
    </div>
    <div className="App-body"><div>
      <div className="subtitle">Explore your Melee 2022</div>
      <div
        className={`content ${codes.length === 0 ? 'content-empty' : 'content-full'}`}
        style={{
          height: !results.length ? '12em' :
            !codes.length ? '18em' : 'calc(32em * 16 / 9)',
          overflow: !results.length ? '' : 'hidden',
        }}
      >
        <div className="flex flex-grow items-center" style={{width: '100%'}}>{
          results.length === 0 ? (<SlpFilesProcessor setFullResults={setResults}/>) :
          codes.length === 0 ?   (<CodeInput results={results} setCodes={setCodes}/>) :
                                 (<ResultsDisplay results={results} codes={codes}/>)
        }</div>
      </div>
    </div></div>
    <Footer/>
  </div>);
};
export default App;
