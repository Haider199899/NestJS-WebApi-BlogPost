/* eslint-disable prettier/prettier */
import {IsNotEmpty,IsEmail,Matches, Max, MaxLength, MinLength} from 'class-validator'
import { Min } from 'sequelize-typescript';
export class UserDto {
     name: string;
    @IsNotEmpty()
    @IsEmail()
     email: string;
    @IsNotEmpty()
 //   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    @MinLength(8)
    @MaxLength(24)
     password: string;
    gender: string;
}