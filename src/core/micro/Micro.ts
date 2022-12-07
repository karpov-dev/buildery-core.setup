import {IWorkspace} from "../../interfaces/IWorkspace";
import {IMicroservice} from "../../interfaces/IMicroservice";
import {docker} from "../../constants";
import {ContainerCreateOptions} from "dockerode";

export class Micro {

  public static async create(workspace: IWorkspace, microservice: IMicroservice, options: ContainerCreateOptions) {
    if (!(workspace && microservice)) throw new Error(`Create container error. Workspace: ${workspace}, Microservice: ${microservice}`);

    return await docker.createContainer(options);
  }

}