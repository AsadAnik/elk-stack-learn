import { IUser } from "../shared";

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
}

export default UserService;
