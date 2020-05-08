import { RequestHandler } from 'express';
import { im } from '../../../utils/informative_middleware';
import { isIXGreetReq } from '../req_type_helpers';
import { returnSwitch } from '@ag1/return_switch';
import { notFound } from '@hapi/boom';

export const en = 'hello foo';
export const th = 'สวัสดี ฟู';

export const xGreet: RequestHandler = im((req, res, next) => {
    if (!isIXGreetReq(req)) {
        return;
    }

    const { username } = req.params;

    if (username !== 'foo') {
        next(notFound(`user: ${username} not exist`));

        return;
    }

    const message = returnSwitch<string>(req.query.lang)([
        ['en', en],
        ['th', th],
        [true, en],
    ]);

    res.json({ message });
});
