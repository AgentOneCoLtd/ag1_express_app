import 'dotenv/config';

import { app } from '@workspace/core_app';
import supertest from 'supertest';

afterAll((done) => {
    setImmediate(done);
});

it('should return greeting message', async () => {
    const response = await supertest(app).get('/api/helloworld').expect(200);

    const { message } = response.body;

    expect(message).toBe('hello, test world');
});
