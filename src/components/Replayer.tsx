import botonreplayh from '../images/botones/replay_boton.gif';
import botonreplay  from '../images/botones/replay_boton_hover.gif';

interface ReplayerProps {
  twitter_link: string;
}

const Replayer: React.FC<ReplayerProps> = ({
  twitter_link
}) => {

  return (<div className="flex flex-col items-center" style={{height: '10em', width: '72em'}}>
    <div className="code-btn image-btn"
      onClick={() => window.open(twitter_link, '_blank')}
      style={{
        width: '7.11em',
        height: '2em',
        backgroundImage: `url(${botonreplay})`,
      }}
      onMouseOver={e => e.currentTarget.style.backgroundImage = `url(${botonreplay})`}
      onMouseOut={e => e.currentTarget.style.backgroundImage = `url(${botonreplayh})`}
    ></div>
  </div>);
};

export default Replayer;
