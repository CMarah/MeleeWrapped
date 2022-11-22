import React, {
  useState,
}                  from 'react';
import twitterlogo from '../images/twitter.png';

interface SharerProps {
  screenshot: Blob | undefined;
}

const twitterUrl = (text: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;

const Sharer: React.FC<SharerProps> = ({
  screenshot,
}) => {
  const [ waiting, setWaiting ] = useState(false);

  const shareOnTwitter = () => {
    // Get screenshot here?
    // Start 4 secs timeout to open twitter, displaying message
    setWaiting(true);
    if (screenshot) {
      // Save to clipboard
      const type = screenshot.type;
      navigator.clipboard.write([
        new ClipboardItem({ [type]: screenshot })
      ]);
    }
    setTimeout(() => {
      setWaiting(false);
      const text = 'Check out my Melee 2022!';
      window.open(twitterUrl(text), '_blank');
    }, 4000);
  };

  return (<div className="share-area flex flex-col items-center" style={{height: '10em'}}>
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
