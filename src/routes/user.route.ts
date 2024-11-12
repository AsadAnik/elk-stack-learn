import { Router } from "express";
import { userController as UserController } from "../controllers";

const router: Router = Router();
const userControllerInstance: UserController = new UserController();

/**
 * GET ALL USERS ROUTE
 */
router.get("/", userControllerInstance.getAllUsers);

/**
 * CREATE USER ROUTE
 */
router.post("/", userControllerInstance.createUser);

export default router;
