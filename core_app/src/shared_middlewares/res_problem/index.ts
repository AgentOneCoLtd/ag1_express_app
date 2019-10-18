import { isNil } from '@ag1/nil';
import { Boom, isBoom } from '@hapi/boom';
import { ErrorRequestHandler } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status';
import { inspect } from 'util';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function isBoomError(error: any): error is Boom {
    if (isNil(error) || !(error instanceof Error)) {
        return false;
    }

    return isBoom(error);
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function getErrorStatusCode(error: any) {
    if (isBoomError(error)) {
        return error.output.statusCode;
    }

    return INTERNAL_SERVER_ERROR;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function returnSomethingBrokenIfEmptyStr(val?: any): string {
    if (typeof val !== 'string' || val.length === 0) {
        return 'something broken';
    }

    return val;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function getErrorMessage(error: any) {
    if (error instanceof Error || isBoomError(error)) {
        return returnSomethingBrokenIfEmptyStr(error.message);
    }

    return returnSomethingBrokenIfEmptyStr(error);
}

export const resMessageErrors: ErrorRequestHandler = (error, _req, res, _next) => {
    res.status(getErrorStatusCode(error)).json({ message: getErrorMessage(error), errors: [inspect(error)] });
};

export const resOnlyMessage: ErrorRequestHandler = (error, _req, res, _next) => {
    res.status(getErrorStatusCode(error)).json({ message: getErrorMessage(error) });
};
