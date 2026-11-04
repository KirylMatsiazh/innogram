import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { User } from '../database/entities/user.entity.js';
import { Profile } from '../database/entities/profile.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiBody,
} from '@nestjs/swagger';

// ENTITIES OWNED: 
// User(POST /users; GET /users/:id),
// Account,
// Profile(GET /users/:id/profile; PATCH /users/:id/profile),
// ProfileFollow
@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a user' })
    @ApiResponse({ status: 201, description: 'Created successfully' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    createUser(@Body() userData: CreateUserDto): Promise<User> {
        return this.usersService.createUser(userData);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiParam({ name: 'id', description: 'User UUID' })
    @ApiResponse({ status: 200, description: 'User found' })
    @ApiResponse({ status: 404, description: 'User not found' })
    findUser(@Param('id') id: string): Promise<User> {
        return this.usersService.findUser(id);
    }

    @Get(':id/profile')
    @ApiOperation({ summary: 'Get user profile' })
    @ApiParam({ name: 'id', description: 'User UUID' })
    @ApiResponse({ status: 200, description: 'Profile found' })
    @ApiResponse({ status: 404, description: 'User or profile not found' })
    findProfile(@Param('id') id: string): Promise<Profile> {
        return this.usersService.findProfile(id);
    }

    @Patch(':id/profile')
    @ApiOperation({ summary: 'Update user profile' })
    @ApiParam({ name: 'id', description: 'User UUID' })
    @ApiResponse({ status: 200, description: 'Profile updated' })
    @ApiResponse({ status: 404, description: 'User or profile not found' })
    @ApiResponse({ status: 400, description: 'Invalid request data' })
    updateProfile(@Param('id') id: string, @Body() profileData: UpdateProfileDto): Promise<Profile> {
        return this.usersService.updateProfile(id, profileData);
    }
}