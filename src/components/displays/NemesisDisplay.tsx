import { CSSTransition } from 'react-transition-group';
import { CleanData }     from '../../lib/types';
import AnimatedText      from '../AnimatedText';
import BarChart          from './BarChart';
import CornerIcon        from './CornerIcon';

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

  return (<>
    <CSSTransition
      in={partial_progress <= 90}
      timeout={500}
      classNames="slideanimation"
      unmountOnExit
    >
      <div className="flex flex-grow flex-col relative w-full h-full">
        <div style={{marginBottom: '6.5em'}}></div>
        <AnimatedText content={"You are only half of every match"} inProp={partial_progress >= 5} />
        <AnimatedText content={"These were your most played opponents in 2022:"} inProp={partial_progress >= 15} />
        <div style={{marginBottom: '2.5em'}}></div>
        {partial_progress >= 25 && (<BarChart data={formatted_data}/>)}
        {data.nemesis.length <= 2 && (<AnimatedText
          content={<span>I'm sure they won't get jelaous<br/>if you play other people.</span>}
          inProp={partial_progress >= 50}
        />)}
        <CornerIcon char_name={''}/>
      </div>
    </CSSTransition>
  </>);
};
