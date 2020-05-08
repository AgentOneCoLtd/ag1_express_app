import { xGreet, en, th } from './index';
import { Boom, isBoom } from '@hapi/boom';

it('should throw middlewareIncorrectOrder error if missing params', () => {
    const mockReq = { query: { lang: 'foo' } } as any;
    const mockNextFn = jest.fn();
    const mockJsonFn = jest.fn();
    const mockRes = {
        json: mockJsonFn,
    } as any;

    expect(() => xGreet(mockReq, mockRes, mockNextFn)).toThrowError('not IXGreetReq');

    expect(mockNextFn).not.toBeCalled();
    expect(mockJsonFn).not.toBeCalled();
});

it('should call next with notFound error if username is not "foo"', () => {
    const mockReq = { params: { username: 'bar' }, query: { lang: 'en' } } as any;
    const mockNextFn = jest.fn();
    const mockJsonFn = jest.fn();
    const mockRes = {
        json: mockJsonFn,
    } as any;

    xGreet(mockReq, mockRes, mockNextFn);

    expect(mockNextFn).toBeCalledTimes(1);
    expect(mockNextFn.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(mockNextFn.mock.calls[0][0]).toBeInstanceOf(Boom);
    expect(isBoom(mockNextFn.mock.calls[0][0])).toBe(true);
    expect(mockNextFn.mock.calls[0][0].message).toBe('user: bar not exist');

    expect(mockJsonFn).not.toBeCalled();
});

it(`should call res.json with { message: "${en}" } (lang en)`, () => {
    const mockReq = { params: { username: 'foo' }, query: { lang: 'en' } } as any;
    const mockNextFn = jest.fn();
    const mockJsonFn = jest.fn();
    const mockRes = {
        json: mockJsonFn,
    } as any;

    xGreet(mockReq, mockRes, mockNextFn);

    expect(mockNextFn).not.toBeCalled();
    expect(mockJsonFn).toBeCalledTimes(1);
    expect(mockJsonFn).toBeCalledWith({
        message: en,
    });
});

it(`should call res.json with { message: "${th}" } (lang th)`, () => {
    const mockReq = { params: { username: 'foo' }, query: { lang: 'th' } } as any;
    const mockNextFn = jest.fn();
    const mockJsonFn = jest.fn();
    const mockRes = {
        json: mockJsonFn,
    } as any;

    xGreet(mockReq, mockRes, mockNextFn);

    expect(mockNextFn).not.toBeCalled();
    expect(mockJsonFn).toBeCalledTimes(1);
    expect(mockJsonFn).toBeCalledWith({
        message: th,
    });
});

it(`should call res.json with { message: "${en}" } (lang undefined)`, () => {
    const mockReq = { params: { username: 'foo' }, query: {} } as any;
    const mockNextFn = jest.fn();
    const mockJsonFn = jest.fn();
    const mockRes = {
        json: mockJsonFn,
    } as any;

    xGreet(mockReq, mockRes, mockNextFn);

    expect(mockNextFn).not.toBeCalled();
    expect(mockJsonFn).toBeCalledTimes(1);
    expect(mockJsonFn).toBeCalledWith({
        message: en,
    });
});

it('should throw middlewareIncorrectOrder error if passing unsupported lang (lang foo)', () => {
    const mockReq = { params: { username: 'foo' }, query: { lang: 'foo' } } as any;
    const mockNextFn = jest.fn();
    const mockJsonFn = jest.fn();
    const mockRes = {
        json: mockJsonFn,
    } as any;

    expect(() => xGreet(mockReq, mockRes, mockNextFn)).toThrowError('not IXGreetReq');

    expect(mockNextFn).not.toBeCalled();
    expect(mockJsonFn).not.toBeCalled();
});
