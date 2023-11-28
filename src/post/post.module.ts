import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { PostController } from './controller/post.controller';
import { PostService } from './service/post.service';
import { Post } from './model/post.model';
import { User } from './../user/model/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Post, User])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
