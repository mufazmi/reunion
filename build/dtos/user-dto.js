"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDto {
    constructor(data) {
        this.id = data._id;
        this.name = data.name;
        this.email = data.email;
        this.followers = 0;
        this.followings = 0;
    }
}
exports.default = UserDto;
