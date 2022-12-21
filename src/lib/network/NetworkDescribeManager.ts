import {docker} from "../../config";
import {NetworkInspectInfo} from "dockerode";

export class NetworkDescribeManager {

  public static async getByName(name: string): Promise<NetworkInspectInfo> {
    return (await docker.listNetworks()).find(network => network.Name === name);
  }

}