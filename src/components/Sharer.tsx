import React, {
  useState,
}                  from 'react';
import twitterlogo from '../images/twitter.png';
import copyicon    from '../images/copy.svg';
import dlicon      from '../images/download.svg';


const userAgent = navigator.userAgent;
const is_chrome = userAgent.match(/chrome|chromium|crios/i);
// TODO use this to not render text

interface SharerProps {
  screenshot: string;
  screenshot_blob: Blob;
  takeScreenshot: any;
}

const twitterUrl = (text: string, url: string) =>
  `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

const Sharer: React.FC<SharerProps> = ({
  screenshot,
  screenshot_blob,
  takeScreenshot,
}) => {
  const [ waiting, setWaiting ] = useState(false);

  const shareOnTwitter = () => {
    takeScreenshot();
    // Start 4 secs timeout to open twitter, displaying message
    setWaiting(true);
    setTimeout(() => {
      setWaiting(false);
      const text = 'Check out my Melee 2022 recap! #MeleeWrapped \n';
      const url = 'https://melee-wrapped.marah.dev';
      window.open(twitterUrl(text, url), '_blank');
    }, 4000);
  };

  const copyImage = () => {

  };

  return (<div className="flex flex-col items-center" style={{height: '10em', width: '72em'}}>
    {!waiting && (<div className="flex flex-col items-center" style={{gap: '0.5em'}}>
      <div>Share your results!</div>
      <div className="flex items-center" style={{width: '10em'}}>
        <div className="flex-grow">
          <a download="melee-wrapped.png" href={URL.createObjectURL(screenshot_blob)}>
            <img src={dlicon} alt="copy"/>
          </a>
        </div>
        {is_chrome && (<div className="flex-grow">
          <img src={copyicon} alt="copy" onClick={copyImage}/>
        </div>)}
        <div className="flex-grow">
          <img
            src={twitterlogo} alt="twitter" style={{width: "2.5em", cursor: "pointer"}}
            onClick={shareOnTwitter}
          />
        </div>
      </div>
    </div>)}
    {waiting && (<div style={{marginBottom: '1em'}}>
      Results <b>copied to clipboard</b>,<br/> paste them on the twitter tab that will open...
    </div>)}
    {waiting && (<div className="circle">
      <div className="circle-fill" style={{background: `linear-gradient(transparent 0%, var(--accent-red) 0%)`}} />
      <div className="circle-overlay" />
    </div>)}
  </div>);
};

export default Sharer;
