export interface IInformativeMiddlewareInfo {
    name: string;
    version: string;
    memo: string;
}

export interface IInformativeMiddlewareOptions {
    logNextIfError: Function;
}
