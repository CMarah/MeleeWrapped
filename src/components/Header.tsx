import frog          from '../images/minifrog.png';
import question_icon from '../images/question.svg';
import unmute_icon   from '../images/mute.svg';
import mute_icon     from '../images/unmute.svg';

interface HeaderProps {
  setOpenModal: (done: boolean) => void;
  muted: boolean;
  setMuted: (muted: boolean) => void;
}

const profiles_style = {
  borderRadius: '50%',
  backgroundColor: '#adffe1',
  width: '2.4em',
  height: '2.4em',
  border: 'solid',
  borderWidth: '0.1em',
};

const Header = ({ setOpenModal, muted, setMuted }: HeaderProps) => (
  <div className="App-header">
    <div className="text-2xl flex items-center" style={{gap: "0.5em"}}>
      <img style={profiles_style} src={frog} alt="marah"/>
      Slippi Wrapped
      <div className="mute-button" onClick={() => setMuted(!muted)}>
        <img src={muted ? unmute_icon : mute_icon} alt="" style={{width: "1.5em"}}/>
      </div>
      <div className="question-button" onClick={() => setOpenModal(true)}>
        <img src={question_icon} alt="" style={{width: "1.5em"}}/>
      </div>
    </div>
  </div>
);
export default Header;
