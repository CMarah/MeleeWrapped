import React, {
  useState,
}                  from 'react';
import twitterlogo from '../images/twitter.png';

interface SharerProps {
  takeScreenshot: any;
}

const twitterUrl = (text: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;

const Sharer: React.FC<SharerProps> = ({
  takeScreenshot,
}) => {
  const [ waiting, setWaiting ] = useState(false);

  const shareOnTwitter = () => {
    takeScreenshot();
    // Start 4 secs timeout to open twitter, displaying message
    setWaiting(true);
    setTimeout(() => {
      setWaiting(false);
      const text = 'Check out my Melee 2022 recap! #MeleeWrapped \n https://melee-wrapped.marah.dev';
      window.open(twitterUrl(text), '_blank');
    }, 4000);
  };

  return (<div className="flex flex-col items-center" style={{height: '10em', width: '72em'}}>
    {!waiting && (<div>
      Share your results!
    </div>)}
    {!waiting && (<img
      src={twitterlogo} alt="" style={{width: "2.5em", cursor: "pointer"}}
      onClick={shareOnTwitter}
    />)}
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
