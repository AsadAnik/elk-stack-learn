import express, { Request, Response, Application, NextFunction } from "express";
import { userRoute } from "./routes";
import { logger } from "./utils";
import { setCorrelationId, expressWinstonHttpLogger, exprssWinstonErrorLogger, expressWinstonInfoLogger } from "./middlewares";

const app: Application = express();

// LOGGINGS ARE DISABLED FOR NOW
// logger.info("Server running with info message");
// logger.error("Error message");
// logger.warn("Warning message");
// logger.http("HTTP message");
// logger.debug("Debug message");
// logger.verbose("Verbose message");
// logger.silly("Silly message");

// Default Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(setCorrelationId);

// Info Logger Middleware
app.use(expressWinstonInfoLogger);


// Default Route
app.get("/", function (_req: Request, res: Response): void {
    logger.info("Default Route");
    res.send("Hello all");
});

// Routes
app.use("/api/users", userRoute);

app.use('*', function (_req: Request, res: Response): void {
    logger.info("Resource Not found!");
    res.status(404).send("Resource Not found!");
});


// Error Logger Middleware  
app.use(exprssWinstonErrorLogger);

// Http Logger Middleware
app.use(expressWinstonHttpLogger);


// The Global Error Handler
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    const errorObj = {
        correlationId: req.headers["x-correlation-id"],
        message: err.message,
        stack: err.stack,
        status: res.statusCode,
    }

    logger.error(JSON.stringify(errorObj));
    res.status(errorObj.status).send(errorObj.message);
});

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const HOST: string = process.env.HOST || "localhost";

app.listen(PORT, HOST, function () {
    console.log(`Server is running on ${HOST}:${PORT}`);
    logger.info(`Server is running on ${HOST}:${PORT}`);
});