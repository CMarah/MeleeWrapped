import { CleanData } from '../../lib/types';
import AnimatedText  from '../AnimatedText';
import BarChart      from './BarChart';
import CornerIcon    from './CornerIcon';

interface Props {
  data: CleanData;
  main_progress: number;
};

export const NemesisDisplay: React.FC<Props> = ({ data, main_progress }) => {
  const partial_progress = main_progress % 100;

  const formatted_data = data.nemesis.map((nemesis) => {
    const name = Object.entries(nemesis.names)
      .sort((a, b) => b[1] - a[1])[0][0];
    return ({
      name,
      games: nemesis.games,
      wins: nemesis.wins,
      winrate: nemesis.winrate,
    });
  });

  return (<div className="flex flex-grow flex-col relative w-full h-full">
    <div style={{marginBottom: '6.5em'}}></div>
    <AnimatedText content={"You are only half of every match"} inProp={partial_progress >= 5} />
    <AnimatedText content={"These are the players you played the most in 2022:"} inProp={partial_progress >= 15} />
    <div style={{marginBottom: '2.5em'}}></div>
    <div style={{ height: 'calc(100% - 9emm)' }}>
      <BarChart data={formatted_data}/>
    </div>
    <CornerIcon char_name={''}/>
  </div>);
};
