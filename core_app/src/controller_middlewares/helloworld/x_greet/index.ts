import { RequestHandler } from 'express';
import { im } from '../../../utils/informative_middleware';
import { isIXGreetReq } from '../req_type_helpers';
import { returnSwitch } from '@ag1/return_switch';

export const author = `${process.env.NODE_ENV} ${process.env.PACKAGE_VERSION}`;
export const en = `hello world from ${author}`;
export const th = `สวัสดีชาวโลก ระบบเวอร์ชั่น ${author}`;

export const xGreet: RequestHandler = im((req, res, _next) => {
    if (!isIXGreetReq(req)) {
        return;
    }

    const message = returnSwitch<string>(req.query.lang)([
        ['en', en],
        ['th', th],
        [true, en],
    ]);

    res.json({ message });
});
