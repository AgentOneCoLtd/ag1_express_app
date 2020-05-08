import { Router } from 'express';
import { greet } from '../../controller_middlewares/helloworld';

export function mapPathWithMiddleware(r: Router): Router {
    r.get('/api/helloworld', greet);

    return r;
}
