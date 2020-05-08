import 'dotenv/config';

import { app } from '@workspace/core_app';
import supertest from 'supertest';

export const en = 'hello foo';
export const th = 'สวัสดี ฟู';

it('should return 200 with en greeting message (username foo, lang en)', async () => {
    const response = await supertest(app).get('/api/users/foo/greet?lang=en').expect(200);

    const { message } = response.body;

    expect(message).toBe(en);
});

it('should return 200 with th greeting message (username foo, lang th)', async () => {
    const response = await supertest(app).get('/api/users/foo/greet?lang=th').expect(200);

    const { message } = response.body;

    expect(message).toBe(th);
});

it('should return 200 with en greeting message (username foo, lang undefined)', async () => {
    const response = await supertest(app).get('/api/users/foo/greet').expect(200);

    const { message } = response.body;

    expect(message).toBe(en);
});

it('should return 422 (username foo, lang foo)', () => {
    return supertest(app).get('/api/users/foo/greet?lang=foo').expect(422);
});

it('should return 404 (username bar, lang en)', () => {
    return supertest(app).get('/api/users/bar/greet?lang=en').expect(404);
});
