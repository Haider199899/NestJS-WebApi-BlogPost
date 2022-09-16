/* eslint-disable prettier/prettier */
import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { ValidateInputPipe } from 'src/core/pipes/validate.pipe';
import { UsePipes } from '@nestjs/common/decorators';
import { LocalAuthGuard } from './localAuthGuard';
import { DoesUserExist } from 'src/core/guards/doesUserExist';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        console.log(req.user)
        return await this.authService.login(req.user);
    }
    @UseGuards(DoesUserExist)
    @Post('signup')
    async signUp(@Body() user: UserDto) {
        return await this.authService.create(user);
    }
}