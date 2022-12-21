import {commonMicroservices} from "../../config";
import {ISourceCodeItem} from "../../types";
import {SourceCodeService} from "../source-code";
import {ImageService} from "../image";

export class SetupLib {

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

  }

  private static async runGlobalRouter() {

  }

}