import botongo       from '../images/botones/go_boton.gif';
import botongoh      from '../images/botones/go_boton_hover.gif';
import botonwatch    from '../images/botones/watchit_boton.gif';
import botonwatchh   from '../images/botones/watchit_boton_hover.gif';
import botongetmine  from '../images/botones/getmine_boton.gif';
import botongetmineh from '../images/botones/getmine_boton_hover.gif';

interface Props {
  setStarted: (started: boolean) => void;
  name: string;
}

// Already existing id/results
const search = window.location.search;
const params = new URLSearchParams(search);
const id = params.get('id');

const StartConfirmation: React.FC<Props> = ({ setStarted, name }) => {

  if (id) {
    return (
      <div className="flex flex-grow flex-col relative items-center" style={{width: '25em', height: '100%'}}>
        <div style={{
          marginTop: '2em',
          fontSize: '1.4em',
        }}>
          We found {name}'s Wrap!
        </div>
        <div
          className="flex flex-grow items-center justify-center"
          style={{ gap: '2em' }}
        >
          <div className="code-btn image-btn"
            onClick={() => setStarted(true)}
            style={{
              width: '8em',
              height: '2em',
              backgroundImage: `url(${botonwatch})`,
            }}
            onMouseOver={e => e.currentTarget.style.backgroundImage = `url(${botonwatchh})`}
            onMouseOut={e => e.currentTarget.style.backgroundImage = `url(${botonwatch})`}
          ></div>
          <div className="code-btn image-btn"
            onClick={() => window.location.href = `https://slippi-wrapped.marah.dev`}
            style={{
              width: '8em',
              height: '2em',
              backgroundImage: `url(${botongetmine})`,
            }}
            onMouseOver={e => e.currentTarget.style.backgroundImage = `url(${botongetmineh})`}
            onMouseOut={e => e.currentTarget.style.backgroundImage = `url(${botongetmine})`}
          ></div>
        </div>
        <div style={{fontSize: '0.8em', marginTop: '1.5em'}}>
          You can <b>rewind or fastforward</b> by clicking each side of the video
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-grow flex-col relative items-center" style={{width: '25em', height: '100%'}}>
      <div style={{
        marginTop: '2em',
        fontSize: '1.4em',
      }}>
        Welcome, {name}!
        <br/>
        Ready to start?
      </div>
      <div className="code-btn image-btn"
        onClick={() => setStarted(true)}
        style={{
          backgroundImage: `url(${botongo})`,
          width: '5.24em',
          height: '3em',
        }}
        onMouseOver={e => e.currentTarget.style.backgroundImage = `url(${botongoh})`}
        onMouseOut={e => e.currentTarget.style.backgroundImage = `url(${botongo})`}
      ></div>
      <div style={{fontSize: '0.8em', marginTop: '1.5em'}}>
        You can <b>rewind or fastforward</b> by clicking each side of the video
      </div>
    </div>
  );
};
export default StartConfirmation;
