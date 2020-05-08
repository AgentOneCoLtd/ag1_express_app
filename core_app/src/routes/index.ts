import { Router } from 'express';
import { mapPathWithMiddleware as mapHelloworld } from './helloworld';
import { mapPathWithMiddleware as mapUsers } from './users';

export function mapPathWithMiddleware(r: Router): Router {
    type Mapper = (r: Router) => Router;

    const mapperList: Mapper[] = [mapHelloworld, mapUsers];

    return mapperList.reduce((mappedR, mapper) => mapper(mappedR), r);
}

export const router = mapPathWithMiddleware(Router());
