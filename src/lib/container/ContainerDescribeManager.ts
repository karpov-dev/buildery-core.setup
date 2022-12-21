import {ContainerInfo} from "dockerode";
import {docker} from "../../config";

export class ContainerDescribeManager {

  public static async getByName(name: string): Promise<ContainerInfo> {
    return (await docker.listContainers()).find(container => container.Names.includes(`/${name}`));
  }

}