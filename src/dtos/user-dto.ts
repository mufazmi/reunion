import { IUser } from "../models/user-model";


class UserDto {

    id: string;
    name: string;
    email: string;
    followers: number;
    followings: number;

    constructor(data: IUser) {
        this.id = data._id;
        this.name = data.name;
        this.email = data.email;
        this.followers = 0;
        this.followings = 0;
    }

}

export default UserDto
