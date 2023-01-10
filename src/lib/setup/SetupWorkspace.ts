import {IWorkspace} from "../../types";
import {AbstractSetupInstance} from "../setup-container-types";
import {
  createWorkspaceNetwork,
  getMicroservicesSetups,
  preventDuplicateWorkspace
} from "./SetupWorkspaceHelper";

export class SetupWorkspace {

  public static async startSetup(workspace: IWorkspace) {
    const setups = getMicroservicesSetups(workspace);

    await this.beforeAll(workspace);
    await this.setup(setups);
    await this.afterAll(setups);
  }

  private static async beforeAll(workspace: IWorkspace) {
    await preventDuplicateWorkspace(workspace);
    await createWorkspaceNetwork(workspace);
  }

  private static async setup(setups: Array<AbstractSetupInstance>) {
    await Promise.all(setups.map(setup => setup.setup()));
  }

  private static async afterAll(setups: Array<AbstractSetupInstance>) {
    await Promise.all(setups.map(setup => setup.afterCallback()));
  }

}