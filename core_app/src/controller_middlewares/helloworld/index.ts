import { RequestHandler } from 'express-serve-static-core';

export const greet: RequestHandler = (_req, res, _next) => {
    res.json({ message: `hello, ${process.env.NODE_ENV} world` });
};
