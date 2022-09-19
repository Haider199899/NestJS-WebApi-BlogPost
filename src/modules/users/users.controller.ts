/* eslint-disable prettier/prettier */
import { Controller,UseGuards,Request,Post,Get, Put, Delete, Param,Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { NotFoundException } from '@nestjs/common/exceptions';
import { UserDto } from './dto/user.dto';
import { User } from './users.entity';
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() user: UserDto, @Request() req): Promise<User> {
        // get the number of row affected and the updated post
        const { numberOfAffectedRows, updatedUser } = await this.userService.update(id, req.user.id);

        // if the number of row affected is zero, 
        // it means the post doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // return the updated post
        return updatedUser;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number) {
        // delete the post with this id
        const deleted = await this.userService.delete(id);

        // if the number of row affected is zero, 
        // then the post doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This User doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
    @Get(':id')
    async findById(@Param('id') id:number) {
        return await this.userService.findOneById(id);
    }
    @Get('findUser')
    async findByEmail (@Body('email') email: string){
        console.log(email)
        return await this.userService.findOneByEmail(email);
    }
}
