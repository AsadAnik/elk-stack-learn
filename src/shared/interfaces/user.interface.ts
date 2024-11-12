import { Request } from "express";

/**
 * User Interface
 */
export interface IUser {
    id: string;
    name?: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt?: Date;
}

/**
 * User Request Interface
 */
export interface IUserRequest extends Request {
    name: string;
    email: string;
    password: string;
}
