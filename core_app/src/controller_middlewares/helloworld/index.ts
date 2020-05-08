import { RequestHandler } from 'express';
import { xCheckReqQuery } from './x_check_req_query';
import { xGreet } from './x_greet';

export const greet: RequestHandler[] = [xCheckReqQuery, xGreet];
