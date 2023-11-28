import { Body, Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../service/auth.service';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  login(@Body() loginDto): { access_token: string } {
    const user = { username: 'hello', email: 'world@naver.com' };
    const token = this.authService.generateToken({
      email: user.email,
      username: user.username,
    });
    return { access_token: token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any): string {
    const user = req.user;
    console.log(user);
    return `Hello, ${req.user.username}!`;
  }
}
