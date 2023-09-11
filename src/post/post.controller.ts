import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @UseGuards(JwtAuthGuard)
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
