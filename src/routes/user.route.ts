import { Router } from "express";
import { userController as UserController } from "../controllers";

const router: Router = Router();
const userControllerInstance: UserController = new UserController();

router.get("/", userControllerInstance.getAllUsers);

export default router;
