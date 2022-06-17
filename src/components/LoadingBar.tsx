import { useEffect, useState } from "react";

interface LoadingBarProps {
  num_files: number,
  num_results: number,
}

const phrases = [
  "That's a lot of Falcos",
  "Nice bermuda triangle DI",
  "Please stop doing double laser from ledge",
  "You really need to work on those ledgedashes",
  "Stop quitting out on low tiers",
  "Fox vs. Marth is 40/60",
  "That ain't Falco",
  "You can just SDI that",
  "Armada is the GOAT",
  "Mango is the GOAT",
  "Stop rolling from the corner",
  "My dog ate the 3000$ controller",
];

const LoadingBar: React.FC<LoadingBarProps> = ({
  num_files,
  num_results,
}) => {
  const [message, setMessage] = useState('');

  const progress = Math.floor(num_results/num_files*100);

  useEffect(() => {
    const message_interval = setInterval(() => {
      const random_index = Math.floor(Math.random()*phrases.length);
      setMessage(phrases[random_index]);
    }, 5000);
    return () => clearInterval(message_interval);
  }, []);

  return (
    <div className="w-full h-6 bg-gray-200 rounded-full" style={{marginTop: '6em'}}>
      <div className="h-6 bg-gray-600 rounded-full" style={{width: progress + '%', color: 'white'}}>
        {progress + '%'}
      </div>
      <div style={{marginTop: '1.5em', fontSize: '1.5em'}}>
        {message}
      </div>
    </div>
  );
};
export default LoadingBar;
