import {NetworkInspectInfo} from "dockerode";
import {docker} from "../../constants";

export class NetworkManager {

  public static async getDescribeByName(name: string): Promise<NetworkInspectInfo> {
    return (await docker.listNetworks()).find(network => network.Name === name);
  }

  public static async getById(id: string) {
    return docker.getNetwork(id);
  }

  public static async isExist(name: string): Promise<Boolean> {
    return !!(await this.getDescribeByName(name));
  }

  public static async isConnectionExist(networkId: string, containerId: string) {
    if (!containerId) throw new Error();

    const network = await this.getById(networkId);
    const inspect = await network.inspect();

    return inspect.Containers.hasOwnProperty(containerId);
  }

}