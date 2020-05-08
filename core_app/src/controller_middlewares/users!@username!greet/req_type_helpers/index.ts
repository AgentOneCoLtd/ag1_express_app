import { Request } from 'express';
import { Query, Params } from 'express-serve-static-core';
import Joi from '@hapi/joi';
import { isNil } from '@ag1/nil';
import { middlewareIncorrectOrder } from '../../../utils/error';

// params
export type ReqParams = Params & {
    username: string;
};

export const reqParamsSchemaMap: Joi.SchemaMap = {
    username: Joi.string().required(),
};

export const reqParamsSchema: Joi.ObjectSchema = Joi.object().keys(reqParamsSchemaMap).required();

export function isReqParams(params: Params): params is ReqParams {
    return isNil(reqParamsSchema.validate(params).error);
}

// query
export type ReqQuery = Query & {
    lang?: string;
};

export const reqQuerySchemaMap: Joi.SchemaMap = {
    lang: Joi.string().valid('th', 'en'),
};

export const reqQuerySchema: Joi.ObjectSchema = Joi.object().keys(reqQuerySchemaMap).required();

export function isReqQuery(query: Query): query is ReqQuery {
    return isNil(reqQuerySchema.validate(query).error);
}

// xGreet
export interface IXGreetReq extends Request<ReqParams> {
    query: ReqQuery;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIXGreetReq(req: any): req is IXGreetReq {
    if (isReqParams(req.params) && isReqQuery(req.query)) {
        return true;
    }

    throw middlewareIncorrectOrder('not IXGreetReq');
}
