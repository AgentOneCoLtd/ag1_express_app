import { Router } from 'express';
import { mapPathWithMiddleware as mapHelloworld } from './helloworld';

export function mapPathWithMiddleware(r: Router): Router {
    type Mapper = (r: Router) => Router;

    const mapperList: Mapper[] = [mapHelloworld];

    return mapperList.reduce((mappedR, mapper) => mapper(mappedR), r);
}

export const router = mapPathWithMiddleware(Router());
