import './App.css';
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
import { screenshotAndCopy } from './lib/utils';

const is_chrome = navigator.userAgent.match(/chrome|chromium|crios/i);

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

  return (<div className="App">
    <Header setOpenModal={setOpenModal} muted={muted} setMuted={setMuted} />
    <div className="App-body">
      <div className="screenshot-area" ref={main_ref} style={{
        paddingBottom: screenshot_uri ? '0' : '4em',
        paddingTop: screenshot_uri ? '0' : '2em',
      }}>
        {screenshot_uri && (<img src={screenshot_uri} alt="summary"/>)}
        {!screenshot_uri && (<Content
          done={done}
          setDone={setDone}
          codes={codes}
          setCodes={setCodes}
          muted={muted}
        />)}
      </div>
      {done && (<Sharer takeScreenshot={takeScreenshot} screenshot_blob={screenshot_blob} codes={codes}/>)}
    </div>
    <Footer/>
    <AboutModal open={open_modal} setOpen={setOpenModal}/>
  </div>);
};
export default App;
