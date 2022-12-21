import {Container} from "dockerode";
import {ContainerDescribeManager} from "./ContainerDescribeManager";
import {docker} from "../../config";

export class ContainerManager {

  public static getById(id: string): Container | null {
    const container = docker.getContainer(id);

    return container.id
      ? container
      : null;
  }

  public static async getByName(name: string): Promise<Container> | null {
    const describe = await ContainerDescribeManager.getByName(name);

    return describe
      ? this.getById(describe?.Id)
      : null;
  }

  public static async removeById(id: string): Promise<any> {
    const container = this.getById(id);
    await container.stop();

    return await container?.remove();
  }

  public static async removeByName(name: string): Promise<any> {
    const container = await this.getByName(name);
    await container.stop();

    return await container?.remove();
  }

}