import {IWorkspace} from "../../types";
import {SetupLib} from "./SetupLib";
import {SetupWorkspace} from "./SetupWorkspace";

export class SetupService {

  public async init() {
    await SetupLib.setup();
  }

  public async setup(workspace: IWorkspace) {
    await SetupWorkspace.startSetup(workspace);
  }

}