import {
  Body,
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { PostService } from '../service/post.service';
import { Post as PostModel } from '../model/post.model';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll(): Promise<PostModel[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<PostModel | null> {
    return this.postService.findById(+id);
  }

  @Post()
  create(
    @Body() post: { title: string; content: string; userId: number },
  ): Promise<PostModel> {
    return this.postService.create(post);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatedPost: { title?: string; content?: string },
  ): Promise<[number]> {
    return this.postService.update(+id, updatedPost);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<number> {
    return this.postService.delete(+id);
  }
}
