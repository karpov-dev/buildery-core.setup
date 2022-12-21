import {NetworkManager} from "./NetworkManager";
import Dockerode, {NetworkCreateOptions} from "dockerode";
import {IWorkspace} from "../../types";
import {docker} from "../../config";
import {EmptyParamError} from "../../errors";

export class NetworkService {

  public static async createNetwork(workspace: IWorkspace): Promise<Dockerode.Network> {
    if (!(workspace)) throw new EmptyParamError('Can not create network', [workspace]);

    if (await this.isNetworkExist(workspace.domain)) return null;

    return await docker.createNetwork(this.getNetworkOptions(workspace));
  }

  public static async connectToNetwork(network: Dockerode.Network, containerId: string) {
    if (!(network && containerId)) throw new Error();

    if (await this.isConnectionExist(network.id, containerId)) throw new Error();

    return await network.connect({Container: containerId});
  }

  public static getNetworkOptions(workspace: IWorkspace): NetworkCreateOptions {
    return {
      Name: workspace.domain,
      Driver: 'bridge'
    }
  }

  public static async isNetworkExist(name: string): Promise<boolean> {
    return !!(await NetworkManager.getByName(name));
  }

  public static async isConnectionExist(networkId: string, containerId: string): Promise<boolean> {
    if (!containerId) throw new Error();

    const network = await NetworkManager.getById(networkId);
    const inspect = await network.inspect();

    return inspect.Containers.hasOwnProperty(containerId);
  }

}