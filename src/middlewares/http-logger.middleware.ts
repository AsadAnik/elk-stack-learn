import winstonExpressLogger from 'express-winston';
import { logger } from '../utils';

/**
 * Express Winston Logger Middleware
 * @param level - Logging Level
 * @returns Express Middleware
 */
const expressWinstonLogger = (level: string) => {
    return winstonExpressLogger.logger({
        level: level || "info",
        winstonInstance: logger,
        meta: true,
        msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
        expressFormat: true,
        colorize: false,
    }); 
};

/**
 * Express Winston Error Logger
 */
const exprssWinstonErrorLogger = expressWinstonLogger("error");

/**
 * Express Winston Info Logger
 */
const expressWinstonInfoLogger = expressWinstonLogger("info");

/**
 * Express Winston Http Logger
 */
const expressWinstonHttpLogger = expressWinstonLogger("http");


export {
    exprssWinstonErrorLogger,
    expressWinstonInfoLogger,
    expressWinstonHttpLogger
};
