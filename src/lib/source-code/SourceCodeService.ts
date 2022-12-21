import simpleGit from "simple-git";
import {tar} from "zip-a-folder";
import * as fs from "fs";
import {ISourceCodeItem} from "../../types";
import {EmptyParamError} from "../../error/EmptyParamError";

//TODO: Мне кажется, что можно напрямую из гита достать исходный код

const SOURCE_DIR = `microservices`;
const TAR_EXTENSION = 'tar';

export class SourceCodeService {

  public static async retrieve(sourceCode: ISourceCodeItem) {
    if (!sourceCode) throw new EmptyParamError('Can not retrieve source code', [sourceCode]);

    const sourceDirPath = this.getTempSourceDirectoryName(sourceCode.name);
    const sourceFilePath = this.getSourceFilePath(sourceCode.name);

    if (this.isExist(sourceFilePath)) throw new Error(`Source code already retrieved: path ${sourceFilePath}`);

    await this.cloneFromGit(sourceCode.repository, sourceDirPath);
    await this.transformToTar(sourceDirPath, sourceFilePath);
    this.deleteDirectory(sourceDirPath);
  }

  public static async update(sourceCode: ISourceCodeItem) {
    if (!sourceCode) throw new EmptyParamError('Can not update source code', [sourceCode]);

    const sourceFilePath = this.getSourceFilePath(sourceCode.name);

    if (this.isExist(sourceFilePath)) {
      this.deleteDirectory(sourceFilePath);
    }

    await this.retrieve(sourceCode);
  }

  public static async updateAllAsync(sourceCodeItems: Array<ISourceCodeItem>) {
    if (!sourceCodeItems) throw new EmptyParamError('Can not mass update source code', [sourceCodeItems]);

    return Promise.all(sourceCodeItems.map(sourceCodeItem => this.update(sourceCodeItem)));
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