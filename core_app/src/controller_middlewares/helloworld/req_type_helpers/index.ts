import { Request } from 'express';
import { Query } from 'express-serve-static-core';
import Joi from '@hapi/joi';
import { isNil } from '@ag1/nil';
import { middlewareIncorrectOrder } from '../../../utils/error';

export interface IReqQuery extends Query {
    lang?: string;
}

export const reqQuerySchemaMap: Joi.SchemaMap = {
    lang: Joi.string().valid('th', 'en'),
};

export const reqQuerySchema: Joi.ObjectSchema = Joi.object().keys(reqQuerySchemaMap).required();

export function isIReqQuery(query: Query): query is IReqQuery {
    return isNil(reqQuerySchema.validate(query).error);
}

export interface IXGreetReq extends Request {
    query: IReqQuery;
}

export function isIXGreetReq(req: Request): req is IXGreetReq {
    if (isIReqQuery(req.query)) {
        return true;
    }

    throw middlewareIncorrectOrder('not IXGreetReq');
}
