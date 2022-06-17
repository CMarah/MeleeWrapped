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
    <div id="content">
      <span className="font-semibold text-white">
        Explore your Melee 2022 <br/>#MeleeWrapped
      </span>
      {!done_processing && (<div style={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
      }}>
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
