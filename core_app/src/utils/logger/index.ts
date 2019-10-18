import { Options as MorganOptions } from 'morgan';
import { createLogger, format, transports } from 'winston';

const { logstash } = format;

export const logger = createLogger({
    format: logstash(),
    transports: [new transports.Console()],
});

export const morganStream = {
    write: logger.info.bind(logger),
};

export const morganOptions: MorganOptions = { stream: morganStream };
