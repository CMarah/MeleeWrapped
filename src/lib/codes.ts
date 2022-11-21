import { Result } from './types';

export const getAllCodes = (results: Array<Result>) => results.reduce((codes, { metadata }) => {
  const code_1 = metadata.players[0].names.code;
  const code_2 = metadata.players[1].names.code;
  codes[code_1] = (codes[code_1] || 0) + 1;
  codes[code_2] = (codes[code_2] || 0) + 1;
  return codes;
}, {} as any);

export const getName = (results: Array<Result>, codes: Array<string>) => {
  const all_names = results.reduce((names, { metadata }) => {
    const our_info = Object.values(metadata.players).find(p => codes.includes(p.names.code));
    const our_name = our_info?.names?.netplay || '';
    names[our_name] = (names[our_name] || 0) + 1;
    return names;
  }, {} as any);
  return Object.entries(all_names)
    .sort((a: any, b: any) => b[1] - a[1])[0][0];
};
