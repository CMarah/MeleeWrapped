import {
  useState,
}                        from 'react';
import DataObtainer      from './DataObtainer';
import ResultsDisplay    from './ResultsDisplay';
import StartConfirmation from './StartConfirmation';
import { CleanData }     from '../lib/types';
import yellow_icons      from '../images/yellow-icons-1.svg';
import frog              from '../images/minifrog.png';
import vidbg             from '../images/vidbg.jpeg';

interface ContentProps {
  done: boolean;
  setDone: (done: boolean) => void;
  codes: Array<string>;
  setCodes: (codes: Array<string>) => void;
  muted: boolean;
}

const Content: React.FC<ContentProps> = ({
  done,
  setDone,
  codes,
  setCodes,
  muted,
}) => {
  // Basic data
  const [ data, setData                   ] = useState<CleanData>();
  const [ prev_year_data, setPrevYearData ] = useState<CleanData>();
  const [ slippigg_elo, setSlippiggElo    ] = useState<number>();
  const [ name, setName                   ] = useState<string>('');
  const [ started, setStarted             ] = useState(false);

  // Already sent/using existing data
  const [ already_sent, setAlreadySent ] = useState(false);

  return (<>
      {!started && (<div className="subtitle">Explore your Melee 2024</div>)}
      <div style={{fontSize: '200%'}}>
        1/12/2024
      </div>
    </>);
};
export default Content;
