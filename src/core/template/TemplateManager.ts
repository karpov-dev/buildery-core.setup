import {docker} from "../../constants";
import {ImageInfo} from "dockerode";

export class TemplateManager {

  public static async getByName(name: string, version: string = 'latest'): Promise<ImageInfo> {
    return (await docker.listImages()).find(image => image.RepoTags.includes(`${name}:${version}`))
  }

  public static async isExist(name: string, version: string = 'latest'): Promise<Boolean> {
    return !!(await this.getByName(name, version));
  }

}