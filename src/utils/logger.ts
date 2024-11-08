import "winston-daily-rotate-file";
import { createLogger, format, transports } from "winston";
const { combine, timestamp, json } = format;

// Console Transport
const consoleTransport = new transports.Console({
    level: "silly",
    format: combine(timestamp(), json()),
});

/**
 * File Transport
 * @param level - Log level
 * @returns File Transport
 */
function fileTransportFunc(level: string = "info") {
    const fileTransport = new transports.File({
        level,
        filename: `logs/${level}/${level}.log`,
        format: combine(timestamp(), json()),
    });

    return fileTransport;
}

// File Transport Instance
const errorFileTransport = fileTransportFunc("error");
const warnFileTransport = fileTransportFunc("warn");
const infoFileTransport = fileTransportFunc("info");
const httpFileTransport = fileTransportFunc("http");
const debugFileTransport = fileTransportFunc("debug");
const verboseFileTransport = fileTransportFunc("verbose");
const sillyFileTransport = fileTransportFunc("silly");

// Logger Instance
const logger = createLogger({
    transports: [
        consoleTransport,
        errorFileTransport,
        warnFileTransport,
        infoFileTransport,
        httpFileTransport,
        debugFileTransport,
        verboseFileTransport,
        sillyFileTransport,
    ],
});

export default logger;