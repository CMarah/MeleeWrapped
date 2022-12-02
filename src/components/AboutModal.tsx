import Modal       from 'react-modal';
import {
  FontAwesomeIcon,
}                  from '@fortawesome/react-fontawesome';
import {
  faGithub,
}                  from '@fortawesome/free-brands-svg-icons';
import twitterlogo from '../images/twitter.png';
import kofilogo    from '../images/kofi.png';
import patreonlogo from '../images/patreon.png';
import omnomnado   from '../images/omnomnado.jpg';
import slippilogo  from '../images/slippilogo.svg';
import sandralogo  from '../images/sandra.jpg';
import marahlogo   from '../images/marahlogo.jpg';
import mpslogo     from '../images/mps.jpg';

Modal.setAppElement('#root');

interface AboutModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const modal_style = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '500',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#dddddd',
    borderRadius: '1em',
    padding: 0,
    fontSize: '1.3em',
    width: '30em',
  },
};

const profiles_style = {
  borderColor: 'var(--accent-green)',
  borderStyle: 'solid',
  borderWidth: '5px',
  borderRadius: '50%',
  width: '4em',
  height: '4em',
  marginRight: '1em',
};

const AboutModal = ({ open, setOpen }: AboutModalProps) => {

  const closeModal = () => {
    setOpen(false);
  };

  return <div>
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      style={modal_style}
    >
      <div style={{
        background: 'var(--dark-2)',
        color: 'var(--light-1)',
        textAlign: 'center',
        padding: '0.5em',
        fontSize: '1.2em',
      }}>
        About
      </div>
      <div style={{
        padding: '1em',
        background: 'var(--dark-1)',
        color: 'var(--light-1)',
      }}>
        <span style={{fontSize: '0.8em', textJustify: 'inter-word'}}>
          This site's obvious inspiration is the yearly Spotify Wrapped, but designed for Melee.
          It's just a fun way of looking back at your year and how you did.<br/>
          When processing the games it will take a few minutes, as it has to go through each
          interaction of each game.
          <br/>
          If you find any bugs, you cand DM me or post them on GitHub.
          The code is open source, so feel free to contribute!
          <br/>
          <br/>
          This project is not associated with Slippi or the Slippi team.
        </span>
        <div className="flex flex-row items-center" style={{marginBottom: '1em', marginTop: '1em'}}>
          <img style={profiles_style} src={marahlogo} alt="marah"/>
          <div>
            <div className='flex flex-row' style={{gap: '0.5em'}}>
              Marah &nbsp;
              <a href="https://twitter.com/projectslippi" target="_blank" rel="noreferrer">
                <img src={twitterlogo} style={{width: '1.5em'}} alt="marah twitter link"/>
              </a>
              <a href="https://github.com/CMarah" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGithub} style={{cursor: 'pointer'}}/>
              </a>
              <a href="https://ko-fi.com/marah" target="_blank" rel="noreferrer">
                <img src={kofilogo} style={{width: '1.5em'}} alt="marah kofi link"/>
              </a>
            </div>
            <span style={{fontSize: '0.8em'}}>Site's main dev</span>
          </div>
        </div>
        <div style={{
          marginTop: '1em',
          marginBottom: '0.5em',
          fontSize: '1.2em',
        }}>
          Acknowledgements
        </div>
        <div className="flex flex-row items-center" style={{marginBottom: '1em'}}>
          <img style={profiles_style} src={slippilogo} alt="slippi"/>
          <div>
            <div className='flex flex-row' style={{gap: '0.5em'}}>
              The Slippi team &nbsp;
              <a href="https://twitter.com/projectslippi" target="_blank" rel="noreferrer">
                <img src={twitterlogo} style={{width: '1.5em'}} alt="slippi team twitter link"/>
              </a>
              <a href="https://www.patreon.com/fizzi36" target="_blank" rel="noreferrer">
                <img src={patreonlogo} style={{width: '1.5em'}} alt="slippi patreon link"/>
              </a>
            </div>
            <span style={{fontSize: '0.8em'}}>For their invaluable work on Slippi.</span>
          </div>
        </div>
        <div className="flex flex-row items-center" style={{marginBottom: '1em'}}>
          <img style={profiles_style} src={omnomnado} alt="omnomnado"/>
          <div>
            <div className='flex flex-row'>
              Omnomnado &nbsp;
              <a href="https://twitter.com/omnomnado" target="_blank" rel="noreferrer">
                <img src={twitterlogo} style={{width: '1.5em'}} alt="omnomnado twitter link"/>
              </a>
            </div>
            <span style={{fontSize: '0.8em'}}>Slippi Wrapped logo and design help.</span>
          </div>
        </div>
        <div className="flex flex-row items-center" style={{marginBottom: '1em'}}>
          <img style={profiles_style} src={sandralogo} alt="SandrewBkmn"/>
          <div>
            <div className='flex flex-row'>
              Sandrew Bkmn &nbsp;
              <a href="https://twitter.com/SandrewBkmn" target="_blank" rel="noreferrer">
                <img src={twitterlogo} style={{width: '1.5em'}} alt="sandrew twitter link"/>
              </a>
            </div>
            <span style={{fontSize: '0.8em'}}>Character turnip icons.</span>
          </div>
        </div>
        <div className="flex flex-row items-center" style={{marginBottom: '1em'}}>
          <img style={profiles_style} src={mpslogo} alt="MPS"/>
          <div>
            <div className='flex flex-row'>
              Spanish Melee Scene &nbsp;
              <a href="https://twitter.com/MeleePMSpain" target="_blank" rel="noreferrer">
                <img src={twitterlogo} style={{width: '1.5em'}} alt="mps twitter link"/>
              </a>
            </div>
            <span style={{fontSize: '0.8em'}}>For being cool.</span>
          </div>
        </div>
      </div>
    </Modal>
  </div>;
};
export default AboutModal;
