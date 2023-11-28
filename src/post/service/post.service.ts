import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './../../user/model/user.model';
import { Post } from '../model/post.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post) private readonly postModel: typeof Post,
    @InjectModel(User) private readonly userModel: typeof User,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postModel.findAll({
      include: [User],
    });
  }

  async findById(id: number): Promise<Post | null> {
    return this.postModel.findByPk(id);
  }

  async create(post: {
    title: string;
    content: string;
    userId: number;
  }): Promise<Post> {
    const user = await this.userModel.findByPk(post.userId);

    if (!user) {
      throw new Error(`User with ID ${post.userId} not found`);
    }

    const createPost = await this.postModel.create({
      title: post.title,
      content: post.content,
      userId: user.id,
    });

    return createPost;
  }

  async update(
    id: number,
    updatedPost: { title?: string; content?: string },
  ): Promise<[number]> {
    return this.postModel.update(updatedPost, {
      where: { id },
    });
  }

  async delete(id: number): Promise<number> {
    const deletedRows = await this.postModel.destroy({
      where: { id },
    });
    return deletedRows;
  }
}
