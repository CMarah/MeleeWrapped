import { CleanData }     from '../../lib/types';
import { CSSTransition } from 'react-transition-group';
import AnimatedText      from '../AnimatedText';
import BarChart          from './BarChart';
import CornerIcon        from './CornerIcon';

interface Props {
  data: CleanData;
  prev_year_data: CleanData | null;
  main_progress: number;
};

export const CharsDisplay: React.FC<Props> = ({ data, main_progress }) => {
  const partial_progress = main_progress % 100;
  const num_chars = Math.min(data.my_chars.length, 5);

  return (<>
    <CSSTransition
      in={partial_progress <= 90}
      timeout={500}
      classNames="slideanimation"
      unmountOnExit
    >
      <div className="flex flex-col relative w-full h-full"
        style={{transition: "all 0.5s ease"}}
      >
        <div style={{marginBottom: '6.5em'}}></div>
        <AnimatedText content={"Who did you play this year?"} inProp={partial_progress >= 5} />
        <AnimatedText
          content={num_chars > 1 ? (<span>
            These were your
            <span style={{color: "var(--accent-yellow)"}}><b> top {num_chars} </b></span>
            most picked characters:
          </span>) : (<span>
            Well, it seems you only picked one character:
          </span>)}
          inProp={partial_progress >= 15}
        />
        <div style={{marginBottom: '2.5em'}}></div>
        {partial_progress >= 25 && (<BarChart data={data.my_chars.slice(0, num_chars)}/>)}
        {num_chars <= 2 && (<AnimatedText
          content={"You know, it's ok to play other characters too."}
          inProp={partial_progress >= 50}
        />)}
        <CornerIcon char_name={data.my_chars[0].name} place_left/>
      </div>
    </CSSTransition>
  </>);
};
