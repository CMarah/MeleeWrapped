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
  "Turnips are cheap today",
  "-Kirby, what do you have there? +A KNIFE!",
];

const LoadingBar: React.FC<LoadingBarProps> = ({
  num_files,
  num_results,
}) => {
  const [message, setMessage] = useState('This process may take a few minutes.');

  const progress = Math.floor(num_results/num_files*100);

  useEffect(() => {
    const message_interval = setInterval(() => {
      const random_index = Math.floor(Math.random()*phrases.length);
      setMessage(phrases[random_index]);
    }, 6000);
    return () => clearInterval(message_interval);
  }, []);

  return (
    <div className="w-full h-6 bg-gray-200 rounded-full" style={{marginTop: '4em'}}>
      <div className="h-6 rounded-full" style={{
        width: progress + '%',
        color: 'var(--light-1)',
        background: 'var(--accent-red)',
        fontWeight: 700,
      }}>
        {progress + '%'}
      </div>
      <div style={{marginTop: '1.5em', fontSize: '1em'}}>
        {message}
      </div>
    </div>
  );
};
export default LoadingBar;
