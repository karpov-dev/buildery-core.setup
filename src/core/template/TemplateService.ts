import {IMicroservice} from "../../interfaces/IMicroservice";
import {SourceCode} from "../source/SourceCode";
import {Template} from "./Template";
import {TemplateManager} from "./TemplateManager";
import {ImageBuildOptions} from "dockerode";

export class TemplateService {

  public static async build(microservice: IMicroservice) {
    if (!microservice) throw new Error();

    if (await TemplateManager.isExist(microservice.name)) throw new Error();

    await SourceCode.update(microservice.name, microservice.git);

    return await Template.build(microservice, this.getBuildOptions(microservice));
  }

  public static getBuildOptions(microservice: IMicroservice) {
    return {
      t: microservice.name,
      remote: microservice.git
    } as ImageBuildOptions
  }

}