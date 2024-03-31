import { User } from "./user";

export class UserResponse {
    user: User = new User;
    followedByAuthUser: boolean = false;
}