import {
  useState,
}                        from 'react';
import DataObtainer      from './DataObtainer';
import ResultsDisplay    from './ResultsDisplay';
import StartConfirmation from './StartConfirmation';
import { CleanData }     from '../lib/types';
import yellow_icons      from '../images/yellow-icons-1.svg';
import frog              from '../images/minifrog.png';

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
  const [ data, setData       ] = useState<CleanData>();
  const [ name, setName       ] = useState<string>('');
  const [ started, setStarted ] = useState(false);

  // Already sent/using existing data
  const [ already_sent, setAlreadySent ] = useState(false);

  return (<>
      {!started && (<div className="subtitle">Explore your Melee 2023</div>)}
      {done && (<div
        className="flex flex-grow items-center justify-center"
        style={{ fontSize: '1.7em' }}
      >
        {name}'s 2023 Slippi Wrap
        <img src={frog} alt="" style={{width: "2em"}}/>
      </div>)}
      <div
        className="content relative"
        style={{
          height: !started ? '18em' :
                  !done ? 'calc(32em * 16 / 9)' : '26em',
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
        }}>{
          !data ?
            (<DataObtainer
              setData={setData}
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
                  codes={codes}
                  setDone={setDone}
                  name={name}
                  already_sent={already_sent}
                  muted={muted}
                />)
              )
        }</div>
      </div>
    </>);
};
export default Content;
