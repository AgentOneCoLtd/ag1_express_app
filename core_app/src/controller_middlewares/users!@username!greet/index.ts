import { RequestHandler } from 'express';
import { xCheckReqParams } from './x_check_req_params';
import { xCheckReqQuery } from './x_check_req_query';
import { xGreet } from './x_greet';

export const greet: RequestHandler[] = [xCheckReqParams, xCheckReqQuery, xGreet];
