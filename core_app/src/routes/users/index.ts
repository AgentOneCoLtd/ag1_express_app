import { Router } from 'express';
import { greet } from '../../controller_middlewares/users!@username!greet';

export function mapPathWithMiddleware(r: Router): Router {
    r.get('/api/users/:username/greet', greet);

    return r;
}
