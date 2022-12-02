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
          <div className="code-btn"
            onClick={() => setStarted(true)}
            style={{
              width: '8em',
              cursor: 'cursor',
              color: 'var(--accent-yellow)',
            }}
          >Watch it</div>
          <div className="code-btn"
            onClick={() => window.location.href = `https://slippi-wrapped.marah.dev`}
            style={{
              width: '8em',
              cursor: 'cursor',
              color: 'var(--accent-yellow)',
            }}
          >Get mine</div>
        </div>
        <div style={{fontSize: '0.8em', marginTop: '1.5em'}}>
          You can move backwards or forwards clicking each side of the video
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
      <div className="code-btn"
        onClick={() => setStarted(true)}
        style={{
          width: '5em',
          cursor: 'cursor',
          color: 'var(--accent-yellow)',
        }}
      >Go!</div>
      <div style={{fontSize: '0.8em', marginTop: '1.5em'}}>
        You can move backwards or forwards clicking each side of the video
      </div>
    </div>
  );
};
export default StartConfirmation;
