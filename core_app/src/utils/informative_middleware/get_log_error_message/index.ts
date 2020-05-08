/* eslint-disable @typescript-eslint/no-explicit-any */

import { IInformativeMiddlewareInfo } from '../type_helpers';

export interface IGetLogErrorMessageResult {
    name?: string;
    version?: string;
    memo?: string;
    dir: string | null;
    error: any;
}
export function getLogErrorMessage(
    error: any,
    dir: string | null,
    info: Partial<IInformativeMiddlewareInfo>,
): IGetLogErrorMessageResult {
    const { name, version, memo } = info;

    return {
        name,
        version,
        memo,
        dir,
        error,
    };
}
