import './App.css';
import {
    useEffect,
  useState,
}                  from 'react';
import SlpFilesProcessor from './components/SlpFilesProcessor';
import {
  Result,
  CleanData,
  cleanDataFromResults,
}                        from './lib/results';

const App = () => {
  const [ full_results, setFullResults ] = useState<Array<Result>>([]);
  const [ clean_data,   setCleanData   ] = useState<CleanData>();
  console.log('CLEAN DATA', clean_data);

  useEffect(() => {
    if (full_results.length !== 0) {
      console.log('Results is:', full_results);
      setCleanData(cleanDataFromResults(full_results));
    }
  }, [full_results]);

  return (<div className="App">
    <header className="App-header">
      <p className="header-title">Melee Wrapped</p>
      <p className="header-subtitle">Your Melee year in review</p>
    </header>
    <div id="content">
      <span className="font-semibold text-white">
        Explore your Melee 2022 <br/>#MeleeWrapped
      </span>
      {full_results.length === 0 && (<div style={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
      }}>
        <SlpFilesProcessor
          setFullResults={setFullResults}
        />
      </div>)}
    </div>
  </div>);
};
export default App;
