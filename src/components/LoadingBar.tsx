import { useEffect, useState } from "react";
import frog_gif from '../images/frolee_wrapped.gif';

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
  "Fox vs. Marth is 60/40",
  "Fox vs. Marth is 50/50",
  "You can just SDI that",
  "Armada is the GOAT",
  "Mango is the GOAT",
  "2007 M2K is the GOAT",
  "HRC typo is the GOAT",
  "Stop rolling from the corner",
  "My dog ate the 3000$ controller",
  "Gotta work on those chaingrabs",
  "Gotta work on those wavedashes",
  "Stop nairing the crouched Samus",
  "Go to your locals",
  "Support your local TOs",
  "Fête 2024 is gonna be lit",
  "Zain is this year's #1",
  "Mango is this year's #1",
  "IBDW is this year's #1",
  "Hbox is this year's #1",
  "Amsa is this year's #1",
  "#SlippiWrapped",
  "#FreeMelee",
  "#FuckNintendo",
  "Eggdog pls sponsor me",
  "Pokimane pls bring back Melee next EVO",
];

const LoadingBar: React.FC<LoadingBarProps> = ({
  num_files,
  num_results,
}) => {
  const [message, setMessage] = useState('This may take a few minutes.');

  const progress = Math.floor(num_results/num_files*100);

  useEffect(() => {
    const message_interval = setInterval(() => {
      const random_index = Math.floor(Math.random()*phrases.length);
      setMessage(phrases[random_index]);
    }, 6000);
    return () => clearInterval(message_interval);
  }, []);

  return (<>
    <div className="w-full flex justify-center" style={{position: "absolute"}}>
      <img src={frog_gif} alt="" style={{width: "6em"}}/>
    </div>
    <div className="w-full h-6 bg-gray-200 rounded-full" style={{
      marginTop: '7em',
      marginLeft: '1em',
      marginRight: '1em',
    }}>
      <div className="h-6 rounded-full" style={{
        width: progress + '%',
        color: 'var(--light-1)',
        background: 'var(--accent-red)',
        fontWeight: 700,
        transition: 'width 0.1s',
      }}>
        {progress + '%'}
      </div>
      <div style={{marginTop: '1.5em', fontSize: '1em'}}>
        {message}
      </div>
    </div>
  </>);
};
export default LoadingBar;
