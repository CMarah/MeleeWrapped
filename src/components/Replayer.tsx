interface ReplayerProps {
  twitter_link: string;
}

const Replayer: React.FC<ReplayerProps> = ({
  twitter_link
}) => {

  return (<div className="flex flex-col items-center" style={{height: '10em', width: '72em'}}>
    <a className="code-btn"
      href={twitter_link}
      style={{
        width: '5em',
        cursor: 'cursor',
        color: 'var(--accent-yellow)',
      }}
    >
      Replay?
    </a>
  </div>);
};

export default Replayer;
