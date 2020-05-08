import { xGreet, en, th } from './index';

it(`should call res.json with { message: "${en}" } (en)`, () => {
    const mockReq = { query: { lang: 'en' } } as any;
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

it(`should call res.json with { message: "${th}" } (th)`, () => {
    const mockReq = { query: { lang: 'th' } } as any;
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

it(`should call res.json with { message: "${en}" } (undefined)`, () => {
    const mockReq = { query: {} } as any;
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

it(`should throw middlewareIncorrectOrder error if passing unsupported lang (foo)`, () => {
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
