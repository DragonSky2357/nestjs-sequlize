import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../model/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findById(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async create(user: { username: string; email: string }): Promise<User> {
    return this.userModel.create(user);
  }

  async update(
    id: number,
    updateUser: { username?: string; email?: string },
  ): Promise<[number]> {
    return this.userModel.update(updateUser, {
      where: { id },
    });
  }

  async remove(id: number): Promise<number> {
    const result = await this.userModel.destroy({
      where: { id },
    });

    return result;
  }
}
