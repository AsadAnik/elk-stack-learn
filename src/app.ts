import express, { Request, Response, Application } from "express";
import { userRoute } from "./routes";
import { logger } from "./utils";

const app: Application = express();

logger.info("Server running with info message");
logger.error("Error message");
logger.warn("Warning message");
logger.debug("Debug message");
logger.verbose("Verbose message");
logger.silly("Silly message");

// Default Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default Route
app.get("/", function (_request: Request, response: Response): void {
    response.send("Hello all");
});

// Routes
app.use("/api/users", userRoute);

app.use('*', function (_request: Request, response: Response): void {
    response.status(404).send("Resource Not found!");
});


const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const HOST: string = process.env.HOST || "localhost";

app.listen(PORT, HOST, function () {
    console.log(`Server is running on ${HOST}:${PORT}`);
});