import {commonMicroservices, docker} from "../../config";
import {ISourceCodeItem} from "../../types";
import {SourceCodeService} from "../source-code";
import {ImageService} from "../image";

export class Lib {

  public static global = {
    network: null
  };

  public static async setup() {
    await this.updateSourceCode();
    await this.buildImages();
    await this.createGlobalNetwork();
    await this.runGlobalRouter();
  }

  private static async updateSourceCode() {
    const sourceCodeItems = commonMicroservices.map(commonMicroservice => {
      return {name: commonMicroservice.name, repository: commonMicroservice.git} as ISourceCodeItem
    });

    await SourceCodeService.updateAllAsync(sourceCodeItems);
  }

  private static async buildImages() {
    await ImageService.buildAllAsync(commonMicroservices);
  }

  private static async createGlobalNetwork() {
    this.global.network = docker.createNetwork({Name: 'global-network'});
  }

  private static async runGlobalRouter() {

  }

}