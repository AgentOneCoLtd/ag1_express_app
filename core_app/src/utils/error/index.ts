import { nil } from '@ag1/nil';
import { Boom, internal } from '@hapi/boom';

export function middlewareIncorrectOrder<T = nil>(message = 'middlewareIncorrectOrder', data?: T): Boom<T> {
    return internal<T>(message, data);
}
