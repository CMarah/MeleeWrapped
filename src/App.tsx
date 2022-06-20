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
    <div className="App-header">
      <p className="text-2xl">Melee Wrapped</p>
    </div>
    <div className="App-body">
      <div>
        <div className="subtitle">Explore your Melee 2022</div>
        <div className={`content ${full_results.length === 0 ? 'content-empty' : 'content-full'}`}>
          {full_results.length === 0 && (<div className="flex flex-grow items-center">
            <SlpFilesProcessor
              setFullResults={setFullResults}
            />
          </div>)}
        </div>
      </div>
    </div>
    <div className="App-footer">
      <div>Find me at</div>
      <div style={{gap: '1em', fontSize: '1.4em'}}>
        <FontAwesomeIcon
          icon={faGithub} style={{marginRight: '0.5em', cursor: 'pointer'}}
          onClick={()=> window.open("https://github.com/CMarah/MeleeWrapped", "_blank")}
        />
        <FontAwesomeIcon
          icon={faTwitter} style={{marginLeft: '0.5em', cursor: 'pointer'}}
          onClick={()=> window.open("https://twitter.com/CarlosMarah", "_blank")}
        />
      </div>
    </div>
  </div>);
};
export default App;
