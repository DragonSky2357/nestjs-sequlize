import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(Number(id));
  }

  @Post()
  create(@Body() user: { username: string; email: string }): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUser: { username?: string; email?: string },
  ): Promise<[number]> {
    return this.userService.update(Number(id), updateUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<number> {
    return this.userService.remove(Number(id));
  }
}
