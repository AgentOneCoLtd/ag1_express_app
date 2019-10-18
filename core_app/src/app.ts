import { returnSwitch } from '@ag1/return_switch';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { router } from './routes';
import { logProblem } from './shared_middlewares/log_problem';
import { resMessageErrors, resOnlyMessage } from './shared_middlewares/res_problem';
import { logger, morganOptions } from './utils/logger';

export function addHelmet(e: Express) {
    return e.use(helmet());
}

export function addCors(e: Express) {
    return e.use(cors());
}

export function addBodyParser(e: Express) {
    return e.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: false }));
}

export function addMorgan(e: Express) {
    return returnSwitch<() => Express>(process.env.NODE_ENV)([
        ['production', () => e.use(morgan('combined', morganOptions))],
        ['test', () => e],
        [true, () => e.use(morgan('dev', morganOptions))],
    ])();
}

export function addRouter(e: Express) {
    return e.use(router);
}

export function addLogProblem(e: Express) {
    return returnSwitch<() => Express>(process.env.NODE_ENV)([
        ['test', () => e],
        [true, () => e.use(logProblem(logger.error))],
    ])();
}

export function addResProblem(e: Express) {
    return returnSwitch<() => Express>(process.env.NODE_ENV)([
        ['production', () => e.use(resOnlyMessage)],
        [true, () => e.use(resMessageErrors)],
    ])();
}

export const app = [addHelmet, addCors, addBodyParser, addMorgan, addRouter, addLogProblem, addResProblem].reduce(
    (e, middleware) => middleware(e),
    express(),
);
