interface LoadingBarProps {
  num_files: number,
  num_results: number,
}

const phrases = [
  "That's a lot of Falcos...",
];

const LoadingBar: React.FC<LoadingBarProps> = ({
  num_files,
  num_results,
}) => {
  const progress = Math.floor(num_results/num_files*100);
  return (
    <div>{progress}</div>
  );
};
export default LoadingBar;
