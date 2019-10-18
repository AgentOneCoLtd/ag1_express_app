import Boom from '@hapi/boom';
import { getErrorMessage, getErrorStatusCode } from './index';

it('should get statusCode 500', () => {
    const statusCode = getErrorStatusCode(new Error('foo'));

    expect(statusCode).toBe(500);
});

it('should ger statusCode 422', () => {
    const statusCode = getErrorStatusCode(Boom.badData());

    expect(statusCode).toBe(422);
});

it('should get "something broken"', () => {
    const errorMessage = getErrorMessage(undefined);

    expect(errorMessage).toBe('something broken');
});

it('should get "Unprocessable Entity"', () => {
    const errorMessage = getErrorMessage(Boom.badData());

    expect(errorMessage).toBe('Unprocessable Entity');
});
