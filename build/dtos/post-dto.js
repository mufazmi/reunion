"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostDto {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.desc = data.desc;
        this.createdAt = new Date(data.createdAt).toLocaleString("en-US", { hour12: true }).replace(",", "");
        this.likes = 0;
        this.comments = [];
    }
}
exports.default = PostDto;
