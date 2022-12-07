import {IWorkspace, IMicroservice} from "../../interfaces";
import {TemplateService, TemplateManager} from "../template";
import {NetworkService, NetworkManager} from "../network";
import {MicroService, MicroManager} from "../micro";
import {Container, Network} from "dockerode";

export class SetupMicro {

  private readonly workspace: IWorkspace;

  private readonly microservice: IMicroservice;

  private micro: Container = null;

  private network: Network = null;

  public constructor(workspace: IWorkspace, microservice: IMicroservice) {
    this.workspace = workspace;
    this.microservice = microservice;
  }

  public async setup() {
    await this.buildTemplate();
    await this.createMicro();
    await this.connectToNetwork();
    await this.runMicro();
  }

  private async buildTemplate() {
    const isTemplateExist = await TemplateManager.isExist(this.microservice.name);

    if (!isTemplateExist) {
      await TemplateService.build(this.microservice);
    }
  }

  private async createMicro() {
    const microName = MicroService.getName(this.workspace, this.microservice)
    const isMicroExist = await MicroManager.isExist(microName);

    this.micro = isMicroExist
      ? await MicroManager.getById((await MicroManager.getDescribeByName(microName)).Id)
      : await MicroService.create(this.workspace, this.microservice);
  }

  private async connectToNetwork() {
    this.network = await NetworkManager.getById((await NetworkManager.getDescribeByName(this.workspace.domain)).Id);

    if (!(await NetworkManager.isConnectionExist(this.network.id, this.micro.id))) {
      await NetworkService.connectToNetwork(this.network, this.micro);
    }
  }

  private async runMicro() {
    const state = (await this.micro.inspect()).State;

    if (!state.Running) {
      await this.micro.start();
    }
  }

}