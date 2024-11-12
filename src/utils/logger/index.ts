import { createLogger, format } from "winston";
import {
    consoleTransport,
    errorFileTransport,
    infoFileTransport,
    httpFileTransport,
    elasticSearchTransport,
} from "./transports";
const { combine, timestamp, json } = format;


/**
 * CREATE LOGGER INSTANCE
 */
const logger = createLogger({
    transports: [
        consoleTransport,
        errorFileTransport,
        infoFileTransport,
        httpFileTransport,
        elasticSearchTransport,
    ],
    format: combine(timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
    }), json()),
    exitOnError: false,
});

// Add error handling for the logger
logger.on('error', (error) => {
    console.error('Logger Error:', error);
});


export default logger;