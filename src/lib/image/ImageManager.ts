import {ImageInfo} from "dockerode";
import {ImageDescribeManager} from "./ImageDescribeManager";

export class ImageManager {
  
  public static async getByName(name: string): Promise<ImageInfo | null> {
    const image = await ImageDescribeManager.getByName(name);

    return image?.Id
      ? image
      : null;
  }
  
}