import {IWorkspace} from "../../interfaces/IWorkspace";
import {IMicroservice} from "../../interfaces/IMicroservice";
import {MicroManager} from "./MicroManager";
import {Micro} from "./Micro";
import {ContainerCreateOptions} from "dockerode";

export class MicroService {

  public static async create(workspace: IWorkspace, microservice: IMicroservice) {
    if (!(workspace && microservice)) throw new Error(`Run container error. Workspace: ${workspace}, Microservice: ${microservice}`);

    const containerName = this.getName(workspace, microservice);

    if (await MicroManager.isExist(containerName)) throw new Error(`Can not run container. Container already exist (${containerName})`);

    return await Micro.create(workspace, microservice, this.getRunOptions(workspace, microservice));
  }

  public static getName(workspace: IWorkspace, microservice: IMicroservice) {
    return `${workspace.domain}--${microservice.name}`;
  }

  public static getRunOptions(workspace: IWorkspace, microservice: IMicroservice): ContainerCreateOptions {
    return {
      Image: microservice.name,
      name: this.getName(workspace, microservice),
      Env: [`DOMAIN=${workspace.domain}`],
      Hostname: this.getName(workspace, microservice),
      Domainname: this.getName(workspace, microservice)
    }
  }

}