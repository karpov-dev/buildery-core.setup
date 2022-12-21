import {IMicroservice, IWorkspace} from "../../types";

export abstract class AbstractSetupContainer {

  protected workspace: IWorkspace = null;

  protected microservice: IMicroservice = null;

  public constructor(workspace: IWorkspace, microservice: IMicroservice) {
    this.workspace = workspace;
    this.microservice = microservice;
  }

  public abstract setup();

  public abstract afterCallback();

}