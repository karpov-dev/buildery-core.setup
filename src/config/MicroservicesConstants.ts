import {IMicroservice} from "../types";

export const commonMicroservices = [
  {
    name: 'micro1',
    git: 'https://github.com/AntonSeminski/nest-test-first-project.git',
  },

  {
    name: 'micro2',
    git: 'https://github.com/AntonSeminski/nest-test-second-project.git',
  }
] as Array<IMicroservice>

export const localRouterMicroservice = {
  name: 'router',
  git: 'https://github.com/AntonSeminski/nest-test-first-project.git',
} as IMicroservice

export const globalRouterMicroservice = {
  name: 'global-router',
  git: 'https://github.com/AntonSeminski/nest-test-first-project.git',
} as IMicroservice