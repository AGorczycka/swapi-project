import { ResourceEnum } from "../enums/resource.enum";
import { IDictionary } from "../models/IDictionary";

export const RESOURCES: Array<IDictionary> = [
    { 
        name: ResourceEnum.PEOPLE, 
        value: ResourceEnum.PEOPLE 
    },
    { 
        name: ResourceEnum.PLANETS,
        value: ResourceEnum.PLANETS
    },
    { 
        name: ResourceEnum.SPECIES,
        value: ResourceEnum.SPECIES
    },
  ];