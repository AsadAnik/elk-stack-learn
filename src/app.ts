import express, { Request, Response, Application } from "express";

const app: Application = express();

app.get("/", function (_request: Request, response: Response): void {
    response.send("Hello all");
});

app.use('*', function (_request: Request, response: Response): void {
    response.status(404).send("Resource Not found!");
});


const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const HOST: string = process.env.HOST || "localhost";

app.listen(PORT, HOST, function () {
    console.log(`Server is running on ${HOST}:${PORT}`);
});