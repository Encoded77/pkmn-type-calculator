import typechartJSON from './pkmn-ss-tw.json';

export type TypeChart = {
  name: string;
  types: {
    name: string;
    color: string;
    weaknesses: string[];
    resistances: string[];
    immunities: string[];
  }[]
};

export const typechart: TypeChart = typechartJSON;
