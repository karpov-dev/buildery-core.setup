import simpleGit from "simple-git";
import {tar} from "zip-a-folder";
import * as fs from "fs";

//TODO: Мне кажется, что можно напрямую из гита достать исходный код

const SOURCE_DIR = `microservices`;
const TAR_EXTENSION = '.tar';

export class SourceCode {

  public static async retrieve(name: string, repository: string) {
    if (!(name && repository)) throw new Error(`Can not clone git project. name ${name}, repository: ${repository}`);

    const sourceDirPath = this.getTempSourceDirectoryName(name);
    const sourceFilePath = this.getSourceFilePath(name);

    if (this.isExist(sourceFilePath)) throw new Error(`Source code already retrieved: path ${sourceFilePath}`);

    await this.cloneFromGit(repository, sourceDirPath);
    await this.transformToTar(sourceDirPath, sourceFilePath);
    this.deleteDirectory(sourceDirPath);
  }

  public static async update(name: string, repository: string) {
    if (!(name && repository)) throw new Error(`Can not update git project. name ${name}, repository: ${repository}`);

    const sourceFilePath = this.getSourceFilePath(name);

    if (this.isExist(sourceFilePath)) {
      await this.deleteDirectory(sourceFilePath);
    }

    await this.retrieve(name, repository);
  }

  public static getSourceFilePath(name) {
    return `${SOURCE_DIR}/${name}.${TAR_EXTENSION}`;
  }

  private static getTempSourceDirectoryName = (name) => `${SOURCE_DIR}/${name}`;

  private static cloneFromGit = async (repository, path) => await simpleGit().clone(repository, path);

  private static transformToTar = async (fromPath, toPath) => await tar(fromPath, toPath);

  private static deleteDirectory = (path) => fs.rmSync(path, {recursive: true, force: true});

  private static isExist = (path) => fs.existsSync(path);
}