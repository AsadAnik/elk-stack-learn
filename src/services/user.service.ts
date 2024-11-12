import { v4 as uuidv4 } from "uuid";
import { IUser, IUserRequest } from "../shared";


class UserService {
    private users: IUser[] = [
        {
            id: "1",
            email: "test@test.com",
            password: "test",
            updatedAt: new Date(),
            createdAt: new Date(),
        },
        {
            id: "2",
            email: "test2@test.com",
            password: "test2",
            createdAt: new Date(),
        },
        {
            id: "3",
            email: "test3@test.com",
            password: "test3",
            createdAt: new Date(),
        },
    ];

    /**
     * Get all users
     * @returns IUser[]
     */
    public getAllUsers(): IUser[] {
        return this.users;
    }

    /**
     * Create a user
     * @param user - IUserRequest
     */
    public createUser(user: IUserRequest): void {
        const newUser: IUser = {
            id: uuidv4(),
            ...user,
            createdAt: new Date(),
        }
        this.users.push(newUser);
    }
}

export default UserService;
 