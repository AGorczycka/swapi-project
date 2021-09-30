import { IPerson } from "./IPerson";
import { IPlanet } from "./IPlanet";
import { ISpecies } from "./ISpecies";

export interface IApiDataPage {
  count: number;
  next: string;
  previous: string;
  results: Array<IPerson | IPlanet | ISpecies>;
}
