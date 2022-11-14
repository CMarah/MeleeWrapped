interface Props {
  setStarted: (started: boolean) => void;
}

const StartConfirmation: React.FC<Props> = ({ setStarted }) => (
  <div className="flex flex-grow flex-col relative items-center" style={{width: '25em', height: '100%'}}>
    <div style={{
      margin: '2em 0',
      fontSize: '1.4em',
    }}>
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
  </div>
);
export default StartConfirmation;
