import 'dotenv/config';

import { app } from '@workspace/core_app';
import supertest from 'supertest';

const author = `${process.env.NODE_ENV} ${process.env.PACKAGE_VERSION}`;
const en = `hello world from ${author}`;
const th = `สวัสดีชาวโลก ระบบเวอร์ชั่น ${author}`;

it('should return 200 with en greeting message (en)', async () => {
    const response = await supertest(app).get('/api/helloworld?lang=en').expect(200);

    const { message } = response.body;

    expect(message).toBe(en);
});

it('should return 200 with th greeting message (th)', async () => {
    const response = await supertest(app).get('/api/helloworld?lang=th').expect(200);

    const { message } = response.body;

    expect(message).toBe(th);
});

it('should return 200 with en greeting message (undefined)', async () => {
    const response = await supertest(app).get('/api/helloworld').expect(200);

    const { message } = response.body;

    expect(message).toBe(en);
});

it('should return 422 (foo)', () => {
    return supertest(app).get('/api/helloworld?lang=foo').expect(422);
});
