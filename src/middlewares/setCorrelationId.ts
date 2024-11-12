import { Request, Response, NextFunction } from 'express';

/**
 * Set Correlation ID Middleware
 * @param req - Request
 * @param res - Response
 * @param next - Next Function
 */
const setCorrelationId = (req: Request, res: Response, next: NextFunction) => {
    const key = "x-correlation-id";
    const correlationId = req.headers[key] || Date.now().toString();

    // set the request header
    req.headers[key] = correlationId;
    // set the response headers
    res.set(key, correlationId);
    next();
}

export default setCorrelationId;