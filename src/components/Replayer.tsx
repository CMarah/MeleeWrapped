interface ReplayerProps {
  setDone: (done: boolean) => void;
  setScreenshotUri: (uri: string) => void;
}

const Replayer: React.FC<ReplayerProps> = ({
  setDone,
  setScreenshotUri,
}) => {

  return (<div className="flex flex-col items-center" style={{height: '10em', width: '72em'}}>
    <button className="code-btn"
      onClick={() => {
        setDone(false);
        setScreenshotUri('');
      }}
      style={{
        width: '5em',
        cursor: 'cursor',
        color: 'var(--accent-yellow)',
      }}
    >
      Replay?
    </button>
  </div>);
};

export default Replayer;
