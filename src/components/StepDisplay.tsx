import { useEffect, useState } from 'react';
import useInterval             from '../lib/useInterval';

interface Props {
  setMainProgress: (progress: number) => void;
}

const STEP_LENGTH_SECONDS = 5;
const PROGRESS_JUMP = 1;
const NUMBER_STEPS = 6;

const StepDisplay: React.FC<Props> = ({ setMainProgress }) => {
  const [ progress, setProgress ] = useState<number>(0);

  useInterval(() => {
    setProgress(progress + PROGRESS_JUMP);
  }, STEP_LENGTH_SECONDS * 1000 / 100 * PROGRESS_JUMP);

  useEffect(() => {
    if (progress%10 === 0) {
      setMainProgress(progress);
    }
  }, [progress, setMainProgress]);

  const bar_width = (progress / (100 * NUMBER_STEPS)) * 100 + "%";

  return <div style={{
    position: 'absolute',
    right: '0',
    left: '0',
    zIndex: '200',
    height: '8px',
  }}>
    <div style={{
      width: '100%',
      height: '100%',
      background: 'var(--dark-1)',
      border: '1px solid var(--dark-2)',
    }}>
      <div style={{
        background: 'var(--dark-2)',
        width: bar_width,
        height: '100%',
        transition: 'width 0.1s',
      }}></div>
    </div>
  </div>;
};
export default StepDisplay;
