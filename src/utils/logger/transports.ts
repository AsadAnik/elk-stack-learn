import "winston-daily-rotate-file";
import { format, transports } from "winston";
import { ElasticsearchTransport} from 'winston-elasticsearch';
const { combine, timestamp, json } = format;


// Elasticsearch Transport
const elasticSearchTransport = new ElasticsearchTransport({
    level: "http",
    clientOpts: {
        node: "http://localhost:9200",
        ssl: {
            rejectUnauthorized: false
        }
    },
    indexPrefix: "log-express",
    indexSuffixPattern: "YYYY.MM.DD",
    mappingTemplate: {
        index_patterns: ["log-express-*"],
        settings: {
            number_of_shards: 1,
            number_of_replicas: 0
        },
        mappings: {
            dynamic_templates: [{
                message_field: {
                    path_match: 'message',
                    mapping: {
                        type: 'text',
                        fields: {
                            keyword: {
                                type: 'keyword'
                            }
                        }
                    }
                }
            }]
        },
    },
    ensureMappingTemplate: true,
    flushInterval: 2000,
});

// Add error handling
elasticSearchTransport.on('error', (error) => {
    console.error('Elasticsearch Transport Error:', error);
});

// Add warning handling
elasticSearchTransport.on('warning', (warning) => {
    console.warn('Elasticsearch Transport Warning:', warning);
});


// Console Transport
const consoleTransport = new transports.Console({
    level: "http", // will show all logs until http level into console
    format: combine(timestamp(), json()),
});


/**
 * File Transport
 * @param level - Log level
 * @returns File Transport
 */
function loggerFileTransport(level: string = "info") {
    const fileTransport = new transports.DailyRotateFile({
        level,
        filename: `logs/${level}/${level}-%DATE%.log`,
        format: combine(timestamp(), json()),
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "1m",
        maxFiles: "1d",
    });

    return fileTransport;
}

// File Transport Instance
const errorFileTransport = loggerFileTransport("error");
// const warnFileTransport = fileTransportFunc("warn");
const infoFileTransport = loggerFileTransport("info");
const httpFileTransport = loggerFileTransport("http");
// const debugFileTransport = fileTransportFunc("debug");
// const verboseFileTransport = fileTransportFunc("verbose");
// const sillyFileTransport = fileTransportFunc("silly");

// Some of the Events 
// DailyRotateFiles Event
loggerFileTransport().on("new", (newFilename) => {
    console.log(`New log file created: ${newFilename}`);
});

// Fire when a log file is rotated
loggerFileTransport().on("rotate", (oldFilename, newFilename) => {
    console.log(`Rotating log file from ${oldFilename} to ${newFilename}`);
});

// Fire when a log file is archived
loggerFileTransport().on("archive", (zipFilename) => {
    console.log(`Log file archived: ${zipFilename}`);
});

// Fire when a log file is deleted
loggerFileTransport().on("delete", (deletedFilename) => {
    console.log(`Log file deleted: ${deletedFilename}`);
});


export {
    consoleTransport,
    errorFileTransport,
    infoFileTransport,
    httpFileTransport,
    elasticSearchTransport,
};