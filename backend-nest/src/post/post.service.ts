import { Injectable } from '@nestjs/common';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostService {

    async getAllPosts() {
        return {message: 'success'};
    }

    async getPostById(id: string) {
        return {message: 'success'};
    }

    async createPost(post: Post) {
        return {message: 'success'};
    }

    async updatePostById(id, post: Post) {
        return {message: 'success'};
    }

    async deletePostById(id) {
        return {message: 'success'};
    }
}
