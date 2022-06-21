import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faTwitter,
}                          from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
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
);
export default Footer;
