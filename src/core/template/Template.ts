import {ImageBuildOptions} from "dockerode";
import {docker} from "../../constants";
import {SourceCode} from "../source";
import {IMicroservice} from "../../interfaces";

export class Template {

  public static async build(microservice: IMicroservice, buildOptions: ImageBuildOptions) {
    if (!microservice) throw new Error(`Build microservice error. Microservice: ${microservice}`);

    return await docker.buildImage(SourceCode.getSourceFilePath(microservice.name), buildOptions);
  }

}