import {ImageInfo} from "dockerode";
import {docker} from "../../config";

export class ImageDescribeManager {

  public static async getByName(name: string, version: string = 'latest'): Promise<ImageInfo> {
    return (await docker.listImages()).find(image => image.RepoTags.includes(`${name}:${version}`))
  }

}