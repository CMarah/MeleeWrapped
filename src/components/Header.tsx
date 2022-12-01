import frog                from '../images/minifrog.png';
import question_icon       from '../images/question.svg';

interface HeaderProps {
  setOpenModal: (done: boolean) => void;
}

const Header = ({ setOpenModal }: HeaderProps) => (
  <div className="App-header">
    <div className="text-2xl flex items-center" style={{gap: "0.5em"}}>
      <img src={frog} alt="" style={{width: "2em"}}/>
      Melee Wrapped
      <div style={{cursor: "pointer", position: 'absolute', right: '1em'}} onClick={() => setOpenModal(true)}>
        <img src={question_icon} alt="" style={{width: "1.5em"}}/>
      </div>
    </div>
  </div>
);
export default Header;
