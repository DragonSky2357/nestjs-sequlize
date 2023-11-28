import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  generateToken(payload: Record<string, any>): string {
    return jwt.sign(payload, process.env.JWT_SECRETKEY, {
      expiresIn: process.env.JWT_EXPIRESIN,
    });
  }

  verifyToken(token: string): Record<string, any> {
    try {
      return jwt.verify(token, process.env.JWT_SECRETKEY) as Record<
        string,
        any
      >;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
