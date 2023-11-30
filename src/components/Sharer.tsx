import React, {
  useState,
}                   from 'react';
import copyicon     from '../images/copy.svg';
import linkicon     from '../images/link.svg';
import dlicon       from '../images/download.svg';
import AnimatedText from './AnimatedText';
import Replayer     from './Replayer';
import {
  FontAwesomeIcon,
}                   from '@fortawesome/react-fontawesome';
import {
  faTwitter,
}                   from '@fortawesome/free-brands-svg-icons';


const userAgent = navigator.userAgent;
const is_chrome = userAgent.match(/chrome|chromium|crios/i);

interface SharerProps {
  screenshot_blob: Blob;
  takeScreenshot: any;
  codes: Array<string>;
}

const text = 'Check out my Melee 2023 recap! #SlippiWrapped \n';
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

  const wrapped_url = `https://slippi-wrapped.marah.dev/?id=${btoa(codes.toString())}`;
  const twitter_url = twitterUrl(text, wrapped_url);

  const shareOnTwitter = () => {
    // Start 7 secs timeout displaying message
    setWaiting(true);
    window.open(twitter_url, '_blank', 'popup=1,width=650,height=400,top=100');
    setTimeout(() => {
      setWaiting(false);
    }, 7000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(wrapped_url);
  };

  return (<>
    <div className="flex flex-col items-center" style={{width: '72em'}}>
      {!waiting && (<div className="flex flex-col items-center" style={{gap: '0.5em'}}>
        <div>Share your results!</div>
        <div className="flex items-center" style={{width: is_chrome ? '16em' : '12em'}}>
          <div className="flex-1" title="Download wrap image">
            <a className="sharer-btn" download="slippi-wrapped.png" href={URL.createObjectURL(screenshot_blob)}>
              <img src={dlicon} alt="copy" style={{height: '1.5em', margin: 'auto'}}/>
            </a>
          </div>
          {is_chrome && (<div className="flex-1" title="Copy wrap image">
            <img src={copyicon} alt="copy" className="sharer-btn" onClick={() => {
              takeScreenshot();
              setShowCopiedMessage(true);
              setTimeout(() => setShowCopiedMessage(false), 1000);
            }} style={{height: '1.5em', margin: 'auto'}}/>
            <div
              className="absolute"
              style={{ marginLeft: '0.5em', fontSize: '0.8em', color: 'white', fontWeight: 'bold' }}
            >
              <AnimatedText content={'Copied'} inProp={show_copied_message} />
            </div>
          </div>)}
          <div className="flex-1" title="Copy link to your own Wrapped">
            <img src={linkicon} alt="copy" className="sharer-btn" onClick={() => {
              copyLink();
              setShowCopiedMessage2(true);
              setTimeout(() => setShowCopiedMessage2(false), 1000);
            }} style={{height: '1.5em', margin: 'auto'}}/>
            <div
              className="absolute"
              style={{ marginLeft: '0.5em', fontSize: '0.8em', color: 'white', fontWeight: 'bold' }}
            >
              <AnimatedText content={'Copied'} inProp={show_copied_message2} />
            </div>
          </div>
          <div
            title="Tweet it!"
            className="flex-1 sharer-btn" style={{height: '1.5em'}}
            onClick={shareOnTwitter}
          >
            <FontAwesomeIcon icon={faTwitter} style={{marginLeft: '0.5em', height: '1.5em'}}/>
          </div>
        </div>
      </div>)}
      {waiting && (<div style={{marginBottom: '1em'}}>
        {is_chrome ?
          (<>Results should have been <b>copied to clipboard</b>,<br/> paste them on the twitter popup that opened...</>) :
          (<>You may want to <b>copy to clipboard</b> the image above,<br/> and paste it on the twitter popup that opened...</>)
        }
      </div>)}
      {waiting && (<div className="circle">
        <div className="circle-fill" style={{background: `linear-gradient(transparent 0%, var(--accent-red) 0%)`}} />
        <div className="circle-overlay" />
      </div>)}
    </div>
    <Replayer twitter_link={wrapped_url}/>
  </>);
};

export default Sharer;
