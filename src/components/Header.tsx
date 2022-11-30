import slippilogo          from '../images/slippilogo.svg';
import question_icon       from '../images/question.svg';

interface HeaderProps {
  setOpenModal: (done: boolean) => void;
}

const Header = ({ setOpenModal }: HeaderProps) => (
  <div className="App-header">
    <div className="text-2xl flex" style={{gap: "0.5em"}}>
      <img src={slippilogo} alt="" style={{width: "1.5em"}}/>
      Melee Wrapped
      <div style={{cursor: "pointer", position: 'absolute', right: '1em'}} onClick={() => setOpenModal(true)}>
        <img src={question_icon} alt="" style={{width: "1.5em"}}/>
      </div>
    </div>
  </div>
);
export default Header;
