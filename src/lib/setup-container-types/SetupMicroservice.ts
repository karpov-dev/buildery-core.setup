import {AbstractSetupContainer} from "./AbstractSetupContainer";
import {ContainerManager, ContainerService} from "../container";
import {NetworkManager, NetworkService} from "../network";
import {Container} from "dockerode";

export class SetupMicroservice extends AbstractSetupContainer {

  protected container: Container = null;

  async setup() {
    await this.createContainer();
    await this.connectToNetwork();
    await this.runContainer();
  }

  async createContainer() {
    const containerName = ContainerService.getContainerName(this.workspace, this.microservice);
    const isContainerExist = await ContainerService.isContainerExist(containerName);

    this.container = isContainerExist
      ? await ContainerManager.getByName(containerName)
      : await ContainerService.create(this.workspace, this.microservice);

    return this.container;
  }

  async connectToNetwork() {
    const network = await NetworkManager.getByName(this.workspace.domain);
    const isConnectionExist = await NetworkService.isConnectionExist(network.id, this.container.id);

    return isConnectionExist
      ? null
      : await NetworkService.connectToNetwork(network, this.container.id);
  }

  async runContainer() {
    const isAlreadyRunning = await ContainerService.isContainerRunning(this.container.id);

    return isAlreadyRunning
      ? null
      : await this.container.start();
  }

  afterCallback() {

  }

}