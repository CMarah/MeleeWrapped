import React, {
  useState,
}                   from 'react';
import twitterlogo  from '../images/twitter.png';
import copyicon     from '../images/copy.svg';
import linkicon     from '../images/link.svg';
import dlicon       from '../images/download.svg';
import AnimatedText from './AnimatedText';


const userAgent = navigator.userAgent;
const is_chrome = userAgent.match(/chrome|chromium|crios/i);

interface SharerProps {
  screenshot_blob: Blob;
  takeScreenshot: any;
  codes: Array<string>;
}

const twitterUrl = (text: string, url: string) =>
  `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

const Sharer: React.FC<SharerProps> = ({
  screenshot_blob,
  takeScreenshot,
  codes,
}) => {
  const [ waiting, setWaiting ] = useState(false);
  const [ show_copied_message,  setShowCopiedMessage  ] = useState(false);
  const [ show_copied_message2, setShowCopiedMessage2 ] = useState(false);

  const wrapped_url = `https://slippi-wrapped.marah.dev?id=${btoa(codes.toString())}`;

  const shareOnTwitter = () => {
    takeScreenshot();
    // Start 5 secs timeout to open twitter, displaying message
    setWaiting(true);
    setTimeout(() => {
      setWaiting(false);
      const text = 'Check out my Melee 2022 recap! #SlippiWrapped \n';
      window.open(twitterUrl(text, wrapped_url), '_blank', 'popup=1');
    }, 5000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(wrapped_url);
  };

  return (<div className="flex flex-col items-center" style={{width: '72em'}}>
    {!waiting && (<div className="flex flex-col items-center" style={{gap: '0.5em'}}>
      <div>Share your results!</div>
      <div className="flex items-center" style={{width: is_chrome ? '16em' : '12em'}}>
        <div className="flex-1">
          <a download="slippi-wrapped.png" href={URL.createObjectURL(screenshot_blob)}>
            <img src={dlicon} alt="copy" style={{height: '1.5em', margin: 'auto'}}/>
          </a>
        </div>
        {is_chrome && (<div className="flex-1">
          <img src={copyicon} alt="copy" onClick={() => {
            takeScreenshot();
            setShowCopiedMessage(true);
            setTimeout(() => setShowCopiedMessage(false), 1000);
          }} style={{height: '1.5em', margin: 'auto', cursor: 'pointer'}}/>
          <div
            className="absolute"
            style={{ marginLeft: '0.5em', fontSize: '0.8em', color: 'white', fontWeight: 'bold' }}
          >
            <AnimatedText content={'Copied'} inProp={show_copied_message} />
          </div>
        </div>)}
        <div className="flex-1" title="Copy link to your own Wrapped">
          <img src={linkicon} alt="copy" onClick={() => {
            copyLink();
            setShowCopiedMessage2(true);
            setTimeout(() => setShowCopiedMessage2(false), 1000);
          }} style={{height: '1.5em', margin: 'auto', cursor: 'pointer'}}/>
          <div
            className="absolute"
            style={{ marginLeft: '0.5em', fontSize: '0.8em', color: 'white', fontWeight: 'bold' }}
          >
            <AnimatedText content={'Copied'} inProp={show_copied_message2} />
          </div>
        </div>
        <div className="flex-1">
          <img
            src={twitterlogo} alt="twitter" style={{height: "2em", cursor: "pointer", margin: 'auto'}}
            onClick={shareOnTwitter}
          />
        </div>
      </div>
    </div>)}
    {waiting && (<div style={{marginBottom: '1em'}}>
      {is_chrome ?
        (<>Results <b>copied to clipboard</b>,<br/> paste them on the twitter popup that will open...</>) :
        (<>You may want to <b>copy to clipboard</b> the image above,<br/> and paste it on the twitter popup that will open...</>)
      }
    </div>)}
    {waiting && (<div className="circle">
      <div className="circle-fill" style={{background: `linear-gradient(transparent 0%, var(--accent-red) 0%)`}} />
      <div className="circle-overlay" />
    </div>)}
  </div>);
};

export default Sharer;
