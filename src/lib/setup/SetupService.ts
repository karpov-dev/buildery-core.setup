import {IWorkspace} from "../../types";
import {Lib} from "./Lib";
import {SetupWorkspace} from "./SetupWorkspace";

export class SetupService {

  public init = async () => await Lib.setup();

  public setup = async (workspace: IWorkspace) => await SetupWorkspace.startSetup(workspace);

}