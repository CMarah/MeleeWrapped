import { CleanData }     from '../../lib/types';
import { CSSTransition } from 'react-transition-group';
import AnimatedText      from '../AnimatedText';
import BarChart          from './BarChart';
import CornerIcon        from './CornerIcon';

interface Props {
  data: CleanData;
  main_progress: number;
};

export const MusDisplay: React.FC<Props> = ({ data, main_progress }) => {
  const partial_progress = main_progress % 100;
  const num_chars = Math.min(data.op_chars.length, 5);

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
        <AnimatedText content={"And who did you fight?"} inProp={partial_progress >= 5} />
        <AnimatedText
          content={<span>Here are your 2022's most common matchups:</span>}
          inProp={partial_progress >= 15}
        />
        <div style={{marginBottom: '2.5em'}}></div>
        <div style={{ height: 'calc(100% - 9emm)' }}>
          <BarChart data={data.op_chars.slice(0, num_chars)}/>
        </div>
        <CornerIcon char_name={data.op_chars[0].name}/>
      </div>
    </CSSTransition>
  </>);
};
