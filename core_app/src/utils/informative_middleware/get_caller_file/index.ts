import { isNil } from '@ag1/nil';

/*
stackTraces = [
    CallerA (aka informationMiddleware),
    CallerB (function that call informationMiddleware),
    ...,
]
*/

export function getCallerBFileNameFromStackTraces(stackTraces: NodeJS.CallSite[]): string | null {
    const callerA = stackTraces[0];
    const callerB = stackTraces.find((caller) => callerA.getFileName() !== caller.getFileName());

    if (isNil(callerB)) {
        return null;
    }

    return callerB.getFileName();
}

export function getCallerFileName(errorCreatedInCallerA: Error): string | null {
    const originalPrepareStackTrace = Error.prepareStackTrace;

    // https://github.com/v8/v8/wiki/Stack%20Trace%20API#customizing-stack-traces
    Error.prepareStackTrace = (_err: Error, stackTraces: NodeJS.CallSite[]) => stackTraces;

    const stackTraces = (errorCreatedInCallerA.stack as unknown) as NodeJS.CallSite[];

    const callerBFileName: string | null = getCallerBFileNameFromStackTraces(stackTraces);

    Error.prepareStackTrace = originalPrepareStackTrace;

    return callerBFileName;
}
