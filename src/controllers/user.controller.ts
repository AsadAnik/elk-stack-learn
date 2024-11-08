import { Request, Response } from "express";
import { userService as UserService } from "../services";
import { IUser } from "../shared";

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
}

export default UserController;
