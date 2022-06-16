import './App.css';
import {
  useState,
}                  from 'react';
import SlpFilesProcessor from './components/SlpFilesProcessor';

interface Result {
  metadata: any; //TODO
}

const App = () => {
  const [ results, setResults ]  = useState<Array<Result>>([]);
  const [ done_processing, setDoneProcessing ] = useState(false);
  console.log('Results is:', results);

  return (<div className="App">
    <header className="App-header">
      <p className="header-title">Melee Wrapped</p>
      <p className="header-subtitle">Your Melee year in review</p>
    </header>
    <div className="content">
      <div style={{marginTop: '3em'}}>
        <span className="font-semibold text-white">
          Explore your Melee 2022 <br/>#MeleeWrapped
        </span>
      </div>
      {!done_processing && (<div style={{marginTop: '2em'}}>
        <SlpFilesProcessor
          results={results}
          setResults={setResults}
          setDoneProcessing={setDoneProcessing}
        />
      </div>)}
    </div>
  </div>);
};
export default App;
