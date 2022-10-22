import { CleanData } from '../../lib/types';
import AnimatedText  from '../AnimatedText';
import BarChart      from './BarChart';
import CornerIcon    from './CornerIcon';

interface Props {
  data: CleanData;
  main_progress: number;
};

export const CharsDisplay: React.FC<Props> = ({ data, main_progress }) => {
  const partial_progress = main_progress % 100;

  return (<div className="flex flex-grow flex-col relative w-full h-full">
    <div style={{marginBottom: '2.5em'}}></div>
    <AnimatedText content={"Who did you play this year?"} inProp={partial_progress >= 0} />
    <AnimatedText content={"These are your top 5 most played characters"} inProp={partial_progress >= 0} />
    <div style={{marginBottom: '2.5em'}}></div>
    <div style={{ height: 'calc(100% - 9emm)' }}>
      <BarChart data={data.my_chars}/>
    </div>
    <CornerIcon char_name={data.my_chars[0].name}/>
  </div>);
};
