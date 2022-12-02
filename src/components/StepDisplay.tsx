import useInterval             from '../lib/useInterval';

interface Props {
  main_progress: number;
  setMainProgress: (progress: number) => void;
}

const STEP_LENGTH_SECONDS = 20;
const PROGRESS_JUMP = 5;
const NUMBER_STEPS = 6;

const interval_timer = (STEP_LENGTH_SECONDS * 1000) / 100 * PROGRESS_JUMP;

const StepDisplay: React.FC<Props> = ({ main_progress, setMainProgress }) => {

  useInterval(
    () => {
      if (main_progress < NUMBER_STEPS*100) {
        setMainProgress(main_progress + PROGRESS_JUMP);
      }
    },
    interval_timer,
  );

  const bar_width = (main_progress / (100 * NUMBER_STEPS)) * 100 + "%";

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
        background: 'var(--accent-yellow)',
        opacity: '0.7',
        width: bar_width,
        height: '100%',
        transition: `width ${interval_timer/1000}s linear`,
      }}></div>
    </div>
  </div>;
};
export default StepDisplay;
