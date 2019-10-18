import { inspect } from 'util';
import { logProblem } from './index';

it('should log error', () => {
    const mockLogFn = jest.fn();
    const middleware = logProblem(mockLogFn);

    const mockReq = {} as any;
    const mockRes = {} as any;
    const mockNextFn = jest.fn();

    const error = new Error('foo');

    middleware(error, mockReq, mockRes, mockNextFn);

    expect(mockLogFn).toBeCalledTimes(1);
    expect(mockLogFn).toBeCalledWith(inspect(error));
});

it('should call next function with error', () => {
    const mockLogFn = jest.fn();
    const middleware = logProblem(mockLogFn);

    const mockReq = {} as any;
    const mockRes = {} as any;
    const mockNextFn = jest.fn();

    const error = new Error('foo');

    middleware(error, mockReq, mockRes, mockNextFn);

    expect(mockNextFn).toBeCalledTimes(1);
    expect(mockNextFn).toBeCalledWith(error);
});
