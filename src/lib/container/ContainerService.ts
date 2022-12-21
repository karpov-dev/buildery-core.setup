import {Container, ContainerCreateOptions} from "dockerode";
import {ContainerManager} from "./ContainerManager";
import {docker} from "../../config";
import {IWorkspace} from "../../types";
import {IMicroservice} from "../../types";

export class ContainerService {

  public static async create(workspace: IWorkspace, microservice: IMicroservice): Promise<Container> {
    if (!(workspace && microservice))  {
      throw new Error(`Create container error. Workspace: ${workspace}, Microservice: ${microservice}`);
    }

    const containerName = this.getContainerName(workspace, microservice);

    if (await this.isContainerExist(containerName)) {
      throw new Error(`Can not run container. Container already exist (${containerName})`);
    }

    return await docker.createContainer(this.getContainerRunOptions(workspace, microservice));
  }

  public static getContainerName(workspace: IWorkspace, microservice: IMicroservice): string {
    return `${workspace.domain}--${microservice.name}`;
  }

  public static getContainerRunOptions(workspace: IWorkspace, microservice: IMicroservice): ContainerCreateOptions {
    const containerName = this.getContainerName(workspace, microservice);

    return {
      Image: microservice.name,
      name: containerName,
      Env: [`DOMAIN=${workspace.domain}`],
      Hostname: containerName,
      Domainname: containerName
    }
  }

  public static async isContainerExist(name: string): Promise<boolean> {
    return !!(await ContainerManager.getByName(name));
  }

  public static async isContainerRunning(id: string): Promise<boolean> {
    const container = ContainerManager.getById(id);

    return (await container.inspect()).State.Running;
  }

}