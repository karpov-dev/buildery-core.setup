export class EmptyParamError extends Error {

  constructor(message: string, params: Array<any>) {
    super(`ERROR - EMPTY PARAMS. ${message}. Params: ${JSON.stringify(params)}`);
  }

}