import {IMicroservice} from "../interfaces/IMicroservice";

export const microservices = [
  {
    name: 'micro1',
    git: 'https://github.com/AntonSeminski/nest-test-first-project.git',
  },

  {
    name: 'micro2',
    git: 'https://github.com/AntonSeminski/nest-test-second-project.git',
  }
] as Array<IMicroservice>