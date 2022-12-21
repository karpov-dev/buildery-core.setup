import {ImageBuildOptions} from "dockerode";
import {IMicroservice} from "../../types";
import {ImageManager} from "./ImageManager";
import {SourceCodeService} from "../source-code";
import {docker} from "../../config";
import {EmptyParamError} from "../../errors";

export class ImageService {

  public static async build(microservice: IMicroservice) {
    if (!microservice) throw new EmptyParamError('Can not build image', [microservice]);

    if (await this.isImageExist(microservice.name)) return null;

    const sourceCodePath = SourceCodeService.getSourceFilePath(microservice.name);
    const buildOptions = this.getImageBuildOptions(microservice);

    return await docker.buildImage(sourceCodePath, buildOptions)
  }

  public static async buildAllAsync(microservices: Array<IMicroservice>) {
    if (!microservices) throw new EmptyParamError('Can not mass build images', [microservices]);

    return Promise.all(microservices.map(microservice => this.build(microservice)));
  }

  public static getImageBuildOptions(microservice: IMicroservice): ImageBuildOptions {
    return {
      t: microservice.name,
      remote: microservice.git
    } as ImageBuildOptions
  }

  public static async isImageExist(name: string): Promise<boolean> {
    return !!await ImageManager.getByName(name);
  }

}