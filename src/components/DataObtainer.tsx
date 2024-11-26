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
import {
  getYearResults,
  getSlippiggElo,
}                        from '../lib/utils';
import { getData }       from '../lib/results';
import frog_gif          from '../images/frolee_2023.gif';

interface DataObtainerProps {
  setData: (data: CleanData) => void;
  setPrevYearData: (data: CleanData) => void;
  setSlippiggElo: (elo: number) => void;
  codes: Array<string>;
  setCodes: (codes: Array<string>) => void;
  setName: (name: string) => void;
  setAlreadySent: (already_sent: boolean) => void;
}

const search = window.location.search;
const params = new URLSearchParams(search);
const id = params.get('id');

const DataObtainer: React.FC<DataObtainerProps> = ({
  setData,
  setPrevYearData,
  setSlippiggElo,
  codes,
  setCodes,
  setName,
  setAlreadySent,
}) => {
  // Basic data
  const [ results, setResults ] = useState<Array<Result>>([]);

  // Already existing id/results
  const [ loading, setLoading ] = useState<boolean>(false);
  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchData = async () => {
        const codes = atob(id).split(',');
        const response_2023 = await getYearResults(id, codes, '2023');
        const response_2022 = await getYearResults(id, codes, '2022');
        const slippigg_data = await getSlippiggElo(codes.toString());
        setName(response_2023.name);
        setCodes(codes);
        setData(response_2023.results);
        setPrevYearData(response_2022);
        setSlippiggElo(slippigg_data);
        setAlreadySent(true);
        setLoading(false);
      };
      fetchData().catch(err => {
        console.error(err);
        setLoading(false);
      });
    }
  }, [setCodes, setData, setPrevYearData, setName, setAlreadySent, setSlippiggElo]);

  // Codes found, prepare data
  useEffect(() => {
    if (results.length > 0 && codes.length) {
      const data = getData(results, codes);
      if (data) {
        setData(data);
      }
    }
  }, [results, codes, setData]);

  // Download prev year's data & slippigg elo
  useEffect(() => {
    if (codes && codes.length) {
      const id_from_codes = btoa(codes.toString());
      getYearResults(id_from_codes, codes, '2022').then(data => {
        if (data && data.results) {
          setPrevYearData(data.results);
        }
      });
      getSlippiggElo(codes.toString()).then(elo => {
        setSlippiggElo(elo);
      });
    }
  }, [codes, setPrevYearData, setSlippiggElo]);

  if (loading) {
    return (<div className="flex flex-grow flex-col relative items-center" style={{width: '25em', height: '100%'}}>
      <div style={{
        margin: '2em 0',
        fontSize: '1.4em',
      }}>
        Loading...
      </div>
      <img src={frog_gif} alt="" style={{width: "12em"}}/>
    </div>);
  }

  // TODO hacer primer calculo del codigo aqui, para evitar frame de espera
  return (<>{results.length === 0 ?
    (<SlpFilesProcessor setFullResults={setResults}/>) :
    (<CodeInput results={results} setCodes={setCodes} setName={setName}/>)
  }</>);
};
export default DataObtainer;
