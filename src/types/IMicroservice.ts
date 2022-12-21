import {EMicroserviceType} from "../enums/EMicroserviceType";

export interface IMicroservice {
  name: string,
  git: string,
  type: EMicroserviceType
}