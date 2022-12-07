import {ContainerInfo} from "dockerode";
import {docker} from "../../constants";

export class MicroManager {

  public static async getDescribeByName(name: string): Promise<ContainerInfo> {
    return (await docker.listContainers()).find(container => container.Names.includes(`/${name}`));
  }

  public static async getById(id: string) {
    return docker.getContainer(id);
  }

  public static async isExist(name: string): Promise<Boolean> {
    return !!(await this.getDescribeByName(name));
  }

}