import { IUser } from "../models/user-model";


class UserDto {

    name;
    email;

    constructor(data: IUser) {
        this.name = data.name;
        this.email = data.email;
    }

}

export default UserDto
