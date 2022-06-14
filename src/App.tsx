import './App.css';
import {
  useState,
  useEffect,
} from 'react';
import SlpSelector from './components/SlpSelector';


const App = () => {
  const [slp_files, setSlpFiles] = useState<Array<File>>([]);

  useEffect(() => {
    console.log('NEW SLP FILES', slp_files, slp_files.length, typeof slp_files.length);
    // TODO process with slippi-js
  }, [slp_files]);

  return (<div className="App">
    <header className="App-header">
      <p style={{fontSize: '2em', margin: '1.5em 0 0.5em 0'}}>Melee Wrapped</p>
      <p style={{fontSize: '1.2em', margin: '0 0 1em 0'}}>Your Melee year in review</p>
    </header>
    <div className="content">
      <div style={{marginTop: '3em'}}>
        <span className="font-semibold text-white">
          Explore your Melee 2022 <br/>#MeleeWrapped
        </span>
      </div>
      {!slp_files.length && (<div style={{marginTop: '2em'}}>
        <SlpSelector
          setSlpFiles={setSlpFiles}
        />
      </div>)}
      {slp_files.length !== 0 && (<div>
        Loading
      </div>)}
    </div>
  </div>);
};

export default App;
