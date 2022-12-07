import {microservices} from "../../constants";
import {SetupMicro} from "./SetupMicro";
import {IWorkspace} from "../../interfaces";
import {NetworkService, NetworkManager} from "../network";

export class SetupService {

  public static async setup(workspace: IWorkspace) {
    await this.runBeforeSetup(workspace);
    await this.runSetup(workspace);
  }

  private static async runBeforeSetup(workspace: IWorkspace) {
    const isNetworkExist = await NetworkManager.isExist(workspace.domain);

    return isNetworkExist
      ? await NetworkManager.getById((await NetworkManager.getDescribeByName(workspace.domain)).Id)
      : await NetworkService.createNetwork(workspace);
  }

  private static async runSetup(workspace: IWorkspace) {
    const setupActions = [];

    microservices.forEach(microservice => {
      const setupMicroservice = new SetupMicro(workspace, microservice);
      return setupMicroservice.setup();
    });

    return Promise.all(setupActions);
  }

}