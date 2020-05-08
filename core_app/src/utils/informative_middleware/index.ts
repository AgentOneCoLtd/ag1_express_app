/* eslint-disable @typescript-eslint/no-explicit-any */

import { isNil } from '@ag1/nil';
import { getCallerFileName } from './get_caller_file';
import { getLogErrorMessage } from './get_log_error_message';
import { IInformativeMiddlewareInfo, IInformativeMiddlewareOptions } from './type_helpers';

export interface IDefaultOptions {
    shouldLogIfError: boolean;
    logError: Function;
    getLogErrorMessage: (error: any, dir: string | null, info: Partial<IInformativeMiddlewareInfo>) => any;
}

// side-effect
export const DEFAULT_OPTIONS: IDefaultOptions = {
    shouldLogIfError: false,
    logError: console.log,
    getLogErrorMessage: getLogErrorMessage,
};

// side-effect
export function updateDefaultOptions(options: Partial<IDefaultOptions>) {
    if (!isNil(options.shouldLogIfError)) {
        DEFAULT_OPTIONS.shouldLogIfError = options.shouldLogIfError;
    }

    if (!isNil(options.logError)) {
        DEFAULT_OPTIONS.logError = options.logError;
    }

    if (!isNil(options.getLogErrorMessage)) {
        DEFAULT_OPTIONS.getLogErrorMessage = options.getLogErrorMessage;
    }

    return DEFAULT_OPTIONS;
}

export function logIfError(
    error: any,
    callerFileName: string | null,
    info: Partial<IInformativeMiddlewareInfo>,
    logError: Function = DEFAULT_OPTIONS.logError,
) {
    if (!DEFAULT_OPTIONS.shouldLogIfError || isNil(error)) {
        return;
    }

    logError(getLogErrorMessage(error, callerFileName, info));
}

export function informativeMiddleware<T extends Function>(
    originalMiddleware: T,
    info: Partial<IInformativeMiddlewareInfo> = {},
    options: Partial<IInformativeMiddlewareOptions> = {},
) {
    const callerFileName = getCallerFileName(new Error());

    // params can be (req, res, next) or (error, req, res, next)
    const altered = (...params: any) => {
        const [originalNext, ...others] = params.reverse();

        const next = (error?: any) => {
            logIfError(error, callerFileName, info, options.logNextIfError);
            originalNext(error);
        };

        originalMiddleware(...others.reverse(), next);
    };

    return (altered as unknown) as T;
}

export const im = informativeMiddleware;
