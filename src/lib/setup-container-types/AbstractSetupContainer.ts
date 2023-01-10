import {AbstractSetupInstance} from "./AbstractSetupInstance";
import {Container} from "dockerode";

export abstract class AbstractSetupContainer extends AbstractSetupInstance {

  protected container: Container = null;

  public abstract createContainer();

  public abstract runContainer();

}