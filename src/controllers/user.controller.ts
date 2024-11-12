import { Request, Response } from "express";
import { userService as UserService } from "../services";
import { IUser, IUserRequest } from "../shared";

// User Service Instance
const userServiceInstance: UserService = new UserService();

/**
 * User Controller
 */
class UserController {
    /**
     * ALL USERS CONTROLLER HERE
     * @param _req 
     * @param res 
     */
    public getAllUsers(_req: Request, res: Response): void {
        try {
            const users: IUser[] = userServiceInstance.getAllUsers();
            res.status(200).json({ message: "Users fetched successfully", users });

        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    /**
     * CREATE USER CONTROLLER HERE
     * @param _req 
     * @param res 
     */
    public createUser(req: Request, res: Response): void {
       try {
            const user: IUserRequest = req.body;

            if (!user.name || !user.email || !user.password) {
                throw new Error("Name, email and password are required");
            }

            userServiceInstance.createUser(user);
            res.status(200).json({ message: "User created successfully", user });

        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
       }
    }
}

export default UserController;
