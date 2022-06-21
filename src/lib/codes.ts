import { Result } from './results';

export const getAllCodes = (results: Array<Result>) => results.reduce((codes, { metadata }) => {
  const code_1 = metadata.players[0].names.code;
  const code_2 = metadata.players[1].names.code;
  codes[code_1] = (codes[code_1] || 0) + 1;
  codes[code_2] = (codes[code_2] || 0) + 1;
  return codes;
}, {} as any);

export const getOurCode = (codes: any) => Object.entries(codes).reduce((our_code, possible_code) => {
  if (possible_code[1] as number > our_code.instances) return {
    code: possible_code[0],
    instances: possible_code[1],
  };
  return our_code;
}, { code: '', instances: 0 } as any).code;
