import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(
    @Body()
    registerRequest: {
      username: string;
      password: string;
      email: string;
    },
  ) {
    try {
      return await this.authService.registerUser(registerRequest);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('/login')
  async login(
    @Body() authenticateRequest: { username: string; password: string },
  ) {
    try {
      return await this.authService.authenticateUser(authenticateRequest);
    } catch (err) {
      if (err.code === 'NotAuthorizedException') {
        throw new UnauthorizedException(err.code, err.message);
      } else {
        throw new BadRequestException(err, err.message);
      }
    }
  }

  @Post('confirm')
  async confirm(
    @Body() confirmUser: { username: string; confirmationCode: string },
  ) {
    try {
      return await this.authService.confirmUser(confirmUser);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body() user: { username: string }) {
    return this.authService.forgotPassword(user);
  }

  @Post('confirm-password')
  async confirmForgotPassword(
    @Body()
    user: {
      username: string;
      confirmationCode: string;
      newPassword: string;
    },
  ) {
    return this.authService.confirmForgotPassword(user);
  }

  @Post('reset-password')
  async resetPassword(
    @Body()
    user: {
      username: string;
      oldPassword: string;
      newPassword: string;
    },
  ) {
    return this.authService.resetPassword(user);
  }
}
