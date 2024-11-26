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
      <div
        className="content relative"
        style={{
          height: !started ? '18em' :
                  !done ? 'calc(32em * 16 / 9)' : '32em',
          width:  done ? '64em' : '32em',
        }}
      >
        <div className='absolute' style={{ right: '-4em', top: '-2em'}}>
          <img src={yellow_icons} alt=""/>
        </div>
        <div className='absolute' style={{ left: '-4em', bottom: '-3em'}}>
          <img src={yellow_icons} alt="" style={{transform: 'rotate(180deg)'}}/>
        </div>
        <div className="flex flex-grow items-center justify-center" style={{
          overflow: 'hidden',
          width: '100%',
          flexDirection: 'column',
          backgroundImage: `url(${vidbg})`,
          backgroundSize: 'cover',
        }}>
          {done && (<div
            className="flex flex-grow items-center justify-center done-header"
            style={{ fontSize: '1.7em', width: '100%' }}
          >
            {name}'s 2024 Slippi Wrap
            <img src={frog} alt="" style={{width: "3em", objectFit: 'cover', height: '4em'}}/>
          </div>)}
          {
            !data ?
              (<DataObtainer
                setData={setData}
                setPrevYearData={setPrevYearData}
                setSlippiggElo={setSlippiggElo}
                codes={codes}
                setCodes={setCodes}
                setName={setName}
                setAlreadySent={setAlreadySent}
              />)
              : (!started ?
                  (<StartConfirmation
                    setStarted={setStarted}
                    name={name}
                  />) :
                  (<ResultsDisplay
                    data={data}
                    prev_year_data={prev_year_data || null}
                    slippigg_elo={slippigg_elo || null}
                    codes={codes}
                    setDone={setDone}
                    name={name}
                    already_sent={already_sent}
                    muted={muted}
                  />)
                )
          }
        </div>
      </div>
    </>);
};
export default Content;
