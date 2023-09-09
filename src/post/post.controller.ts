import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    async getAllPosts() {
        return this.postService.getAllPosts();
    }

    @Get(':id')
    async getPost(@Param('id') id: string) {
        return this.postService.getPostById(id);
    }

    @Post()
    async createPost(@Body() post: CreatePostDto) {
        return this.postService.createPost(post)
    }

    @Put(':id')
    async updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
        return this.postService.updatePostById(id, post);
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        return this.postService.deletePostById(id);
    }

}
