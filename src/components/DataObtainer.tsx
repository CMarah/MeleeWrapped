import {
  useState,
  useEffect,
}                        from 'react';
import SlpFilesProcessor from './SlpFilesProcessor';
import CodeInput         from './CodeInput';
import {
  Result,
  CleanData,
}                        from '../lib/types';
import { getFromGcp }    from '../lib/utils';
import { getData }       from '../lib/results';
import frog_gif          from '../images/frolee_wrapped.gif';

interface DataObtainerProps {
  setData: (data: CleanData) => void;
  codes: Array<string>;
  setCodes: (codes: Array<string>) => void;
  setName: (name: string) => void;
}

const DataObtainer: React.FC<DataObtainerProps> = ({
  setData,
  codes,
  setCodes,
  setName,
}) => {
  // Basic data
  const [ results, setResults ] = useState<Array<Result>>([]);

  // Already existing id/results
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get('id');
  const [ loading, setLoading ] = useState<boolean>(false);
  useEffect(() => {
    if (id) {
      setLoading(true);
      const codes = atob(id).split(',');
      getFromGcp(id)
        .then(response => {
          if (response) {
            setName(response.name);
            setCodes(codes);
            setData(response.results);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id, setCodes, setData, setName]);

  // Codes found, prepare data
  useEffect(() => {
    if (results.length > 0 && codes.length) {
      const data = getData(results, codes);
      if (data) {
        setData(data);
      }
    }
  }, [results, codes, setData]);

  if (loading) {
    return (<div className="flex flex-grow flex-col relative items-center" style={{width: '25em', height: '100%'}}>
      <div style={{
        margin: '2em 0',
        fontSize: '1.4em',
      }}>
        Loading...
      </div>
      <img src={frog_gif} alt="" style={{width: "6em"}}/>
    </div>);
  }

  // TODO hacer primer calculo del codigo aqui, para evitar frame de espera
  return (<>{
    results.length === 0 ? (<SlpFilesProcessor setFullResults={setResults}/>) :
      (<CodeInput results={results} setCodes={setCodes} setName={setName}/>)
  }</>);
};
export default DataObtainer;
