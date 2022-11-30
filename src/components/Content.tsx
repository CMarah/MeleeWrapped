import {
  useState,
}                          from 'react';
import DataObtainer        from './DataObtainer';
import ResultsDisplay      from './ResultsDisplay';
import StartConfirmation   from './StartConfirmation';
import { CleanData }       from '../lib/types';
import yellow_icons        from '../images/yellow-icons-1.svg';
import frog                from '../images/minifrog.png';

interface ContentProps {
  done: boolean;
  setDone: (done: boolean) => void;
  codes: Array<string>;
  setCodes: (codes: Array<string>) => void;
}

const Content: React.FC<ContentProps> = ({
  done,
  setDone,
  codes,
  setCodes,
}) => {
  // Basic data
  const [ data, setData       ] = useState<CleanData>();
  const [ name, setName       ] = useState<string>('');
  const [ started, setStarted ] = useState(false);

  return (<>
      {!started && (<div className="subtitle">Explore your Melee 2022</div>)}
      {done && (<div
        className="flex flex-grow items-center justify-center"
        style={{ fontSize: '1.7em' }}
      >
        {name}'s 2022 Melee Wrap
        <img src={frog} alt="" style={{width: "2em"}}/>
      </div>)}
      <div
        className="content relative"
        style={{
          height: !data ? '16em' :
                  !started ? '18em' :
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
          overflow: 'hidden', // TODO may need to set to '' in some case
          width: '100%',
        }}>{
          !data ?    (<DataObtainer setData={setData} codes={codes} setCodes={setCodes} setName={setName}/>) :
          !started ? (<StartConfirmation setStarted={setStarted} />) :
                     (<ResultsDisplay data={data} codes={codes} setDone={setDone} name={name}/>)
        }</div>
      </div>
    </>);
};
export default Content;
