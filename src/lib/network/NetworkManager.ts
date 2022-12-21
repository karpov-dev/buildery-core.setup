import {Network} from "dockerode";
import {docker} from "../../config";
import {NetworkDescribeManager} from "./NetworkDescribeManager";

export class NetworkManager {

  public static getById(id: string): Network | null {
    const network = docker.getNetwork(id);

    return network?.id
      ? network
      : null;
  }

  public static async getByName(name: string): Promise<Network> | null {
    const describe = await NetworkDescribeManager.getByName(name);

    return this.getById(describe?.Id);
  }

  public static async removeById(id: string): Promise<any> {
    const network = this.getById(id);

    return network?.remove();
  }

  public static async removeByName(name: string): Promise<any> {
    const network = await this.getByName(name);

    return network?.remove();
  }

}