import {IWorkspace} from "../../interfaces";
import {NetworkManager} from "./NetworkManager";
import {Network} from "./Network";
import Dockerode, {NetworkCreateOptions} from "dockerode";

export class NetworkService {

  public static async createNetwork(workspace: IWorkspace): Promise<Dockerode.Network> {
    if (!(workspace)) throw new Error();

    if (await NetworkManager.isExist(workspace.domain)) throw new Error();

    return await Network.create(this.getNetworkOptions(workspace));
  }

  public static async connectToNetwork(network: Dockerode.Network, micro: Dockerode.Container) {
    if (!(network && micro)) throw new Error();

    if (await NetworkManager.isConnectionExist(network.id, micro.id)) throw new Error();

    return network.connect({Container: micro.id});
  }

  public static getNetworkOptions(workspace: IWorkspace): NetworkCreateOptions {
    return {
      Name: workspace.domain,
      Driver: 'bridge'
    }
  }

}