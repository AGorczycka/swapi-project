import { ResourceEnum } from "../enums/resource.enum";
import { IDictionary } from "../models/IDictionary";

export const COMPARABLE_VALUES: Array<IDictionary> = [
  { 
    name: ResourceEnum.PEOPLE, 
    value: 'mass'
  },
  { 
    name: ResourceEnum.PLANETS,
    value: 'population'
  },
  { 
    name: ResourceEnum.SPECIES,
    value: 'average_lifespan'
  },
];
