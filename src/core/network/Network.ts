import {docker} from "../../constants";
import {NetworkCreateOptions} from "dockerode";

export class Network {

  public static async create(options: NetworkCreateOptions) {
    return await docker.createNetwork(options);
  }

}