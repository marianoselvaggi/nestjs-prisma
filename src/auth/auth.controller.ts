import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
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
      throw new BadRequestException(err.message);
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
}
