import { CSSTransition } from 'react-transition-group';
import { CleanData }     from '../../lib/types';
import AnimatedText      from '../AnimatedText';
import BarChart          from './BarChart';
import CornerIcon        from './CornerIcon';

interface Props {
  data: CleanData;
  prev_year_data: CleanData | null;
  main_progress: number;
};

export const StagesDisplay: React.FC<Props> = ({ data, main_progress }) => {
  const partial_progress = main_progress % 100;

  return (<>
    <CSSTransition
      in={partial_progress <= 90}
      timeout={500}
      classNames="slideanimation"
      unmountOnExit
    >
      <div className="flex flex-grow flex-col relative w-full h-full">
        <div style={{marginBottom: '6.5em'}}></div>
        <AnimatedText content={"And what about stages?"} inProp={partial_progress >= 5} />
        <AnimatedText content={"This is how you did on each one:"} inProp={partial_progress >= 15} />
        <div style={{marginBottom: '2.5em'}}></div>
        {partial_progress >= 25 && (<BarChart data={data.stages}/>)}
        <CornerIcon char_name={data.stages[0].name}/>
      </div>
    </CSSTransition>
  </>);
};
