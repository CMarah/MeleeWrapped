import './App.css';
import background            from './images/background.gif';
import {
  useState,
  useRef,
  useCallback,
  useEffect,
}                            from 'react';
import Header                from './components/Header';
import Content               from './components/Content';
import Footer                from './components/Footer';
import Sharer                from './components/Sharer';
import AboutModal            from './components/AboutModal';
import MusicPlayer           from './components/MusicPlayer';
import { screenshotAndCopy } from './lib/utils';
import yellow_icons          from './images/yellow-icons-1.svg';

const is_chrome = navigator.userAgent.match(/chrome|chromium|crios/i);

const current_year = (() => {
  const now = new Date();
  if (now.getMonth() === 11) return now.getFullYear();
  return now.getFullYear() - 1;
})();

const App = () => {
  // Basics
  const [ codes, setCodes          ] = useState<Array<string>>([]);
  const [ done, setDone            ] = useState(false);
  const [ open_modal, setOpenModal ] = useState(false);
  const [ muted, setMuted          ] = useState(false);

  // Screenshot logic
  const main_ref = useRef<HTMLDivElement>(null);
  const [ screenshot_blob, setScreenshotBlob ] = useState<Blob>(new Blob());
  const [ screenshot_uri, setScreenshotUri   ] = useState<string>('');
  const takeScreenshot = useCallback(() => {
    if (!main_ref.current) return null;
    return screenshotAndCopy(main_ref.current, !!is_chrome);
  }, [main_ref]);
  useEffect(() => {
    // When done, set screenshot after 1 sec
    if (done) setTimeout(async () => {
      const blob = await takeScreenshot();
      if (blob) {
        setScreenshotBlob(blob || new Blob());
        setScreenshotUri(URL.createObjectURL(blob));
      }
    }, 1000);
  }, [done, setScreenshotUri, takeScreenshot]);

  return (<div className="App" style={{
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
  }}>
    <Header setOpenModal={setOpenModal} muted={muted} setMuted={setMuted} />
    <div className="App-body">
      <div className="screenshot-area" ref={main_ref} style={{
        paddingBottom: screenshot_uri ? '0' : '0',
        paddingTop: screenshot_uri ? '0' : '0',
      }}>
        {screenshot_uri && (<>
          <div className='absolute' style={{ right: '-4em', top: '-3em'}}>
            <img src={yellow_icons} alt=""/>
          </div>
          <div className='absolute' style={{ left: '-4em', bottom: '-3em'}}>
            <img src={yellow_icons} alt="" style={{transform: 'rotate(180deg)'}}/>
          </div>
        </>)}
        {screenshot_uri && (<img src={screenshot_uri} alt="summary"/>)}
        {done && (<MusicPlayer step={6} muted={muted}/>)}
        {!screenshot_uri && (<Content
          done={done}
          setDone={setDone}
          codes={codes}
          setCodes={setCodes}
          muted={muted}
          current_year={current_year}
        />)}
      </div>
      {done && (<Sharer takeScreenshot={takeScreenshot} screenshot_blob={screenshot_blob} codes={codes} current_year={current_year}/>)}
    </div>
    <Footer/>
    <AboutModal open={open_modal} setOpen={setOpenModal}/>
  </div>);
};
export default App;
