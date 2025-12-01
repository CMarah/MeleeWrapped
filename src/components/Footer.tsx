import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faTwitter,
}                          from '@fortawesome/free-brands-svg-icons';

const github_url: string = "https://github.com/CMarah/MeleeWrapped";
const twitter_url: string = "https://twitter.com/CarlosMarah";

const auxClickHandler = (url: string) => (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
  if (event.button === 1) {
    window.open(url, "_blank")
  }
};

const clickHandler = (url: string) => {
  window.open(url, "_blank")
};

const Footer = () => (
  <div className="App-footer">
    <div>Find me at</div>
    <div style={{ gap: '1em', fontSize: '1.4em' }}>
      <FontAwesomeIcon
        icon={faGithub} style={{ marginRight: '0.5em', cursor: 'pointer' }}
        onClick={() => clickHandler(github_url)}
        onAuxClick={auxClickHandler(github_url)}
      />
      <FontAwesomeIcon
        icon={faTwitter} style={{ marginLeft: '0.5em', cursor: 'pointer' }}
        onClick={() => clickHandler(twitter_url)}
        onAuxClick={auxClickHandler(twitter_url)}
      />
    </div>
  </div>
);
export default Footer;
