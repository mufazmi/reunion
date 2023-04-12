import { IUser } from "../models/user-model";


class UserDto {

    id;
    name;
    email;

    constructor(data: IUser) {
        this.id = data._id;
        this.name = data.name;
        this.email = data.email;
    }

}

export default UserDto
