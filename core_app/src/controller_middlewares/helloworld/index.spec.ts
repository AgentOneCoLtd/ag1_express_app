import { greet } from './index';

it('should call res.json with { message: "hello, test world"}', () => {
    const mockReq = {} as any;
    const mockNextFn = jest.fn();
    const mockJsonFn = jest.fn();
    const mockRes = {
        json: mockJsonFn,
    } as any;

    greet(mockReq, mockRes, mockNextFn);

    expect(mockNextFn).not.toBeCalled();
    expect(mockJsonFn).toBeCalledTimes(1);
    expect(mockJsonFn).toBeCalledWith({ message: 'hello, test world' });
});
