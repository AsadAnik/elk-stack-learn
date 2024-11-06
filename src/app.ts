import express, { Request, Response } from "express";

const app = express();

app.get("/", function (_request: Request, response: Response) {
    response.send("Hello all");
});

app.use('*', function (_request: Request, response: Response) {
    response.status(404).send("Resource Not found!");
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});