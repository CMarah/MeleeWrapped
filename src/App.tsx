import './App.css';
import {
  useEffect,
  useState,
}                          from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faTwitter,
}                          from '@fortawesome/free-brands-svg-icons'
import SlpFilesProcessor   from './components/SlpFilesProcessor';
import {
  Result,
  CleanData,
  cleanDataFromResults,
}                          from './lib/results';

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
    </header>
    <div className="subtitle">
      Explore your Melee 2022
    </div>
    <div className={`content ${full_results.length === 0 ? 'content-empty' : 'content-full'}`}>
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
    <div className="App-footer">
      <div>Find me at</div>
      <div style={{gap: '1em', fontSize: '1.4em'}}>
        <FontAwesomeIcon icon={faGithub} style={{marginRight: '0.5em'}}/>
        <FontAwesomeIcon icon={faTwitter} style={{marginLeft: '0.5em'}}/>
      </div>
    </div>
  </div>);
};
export default App;
