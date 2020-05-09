import { Request } from 'express';
import { Query } from 'express-serve-static-core';
import Joi from '@hapi/joi';
import { isNil } from '@ag1/nil';
import { middlewareIncorrectOrder } from '../../../utils/error';

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
export interface IXGreetReq extends Request {
    query: ReqQuery;
}

export function isIXGreetReq(req: Request): req is IXGreetReq {
    if (isReqQuery(req.query)) {
        return true;
    }

    throw middlewareIncorrectOrder('not IXGreetReq');
}
