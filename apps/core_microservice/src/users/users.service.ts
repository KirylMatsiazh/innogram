import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity.js';
import { Profile } from '../database/entities/profile.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';

// ENTITIES OWNED: 
// User(POST /users; GET /users/:id),
// Account,
// Profile(GET /users/:id/profile; PATCH /users/:id/profile),
// ProfileFollow

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>
    ) { }

    //USER
    async createUser(userData: CreateUserDto): Promise<User> {
        const user = this.userRepository.create({
            ...userData,
            updatedAt: new Date(),
        });

        return this.userRepository.save(user);
    }

    async findUser(id: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    //PROFILE
    async findProfile(id: string): Promise<Profile> {
        const user = await this.findUser(id);
        
        const profile = await this.profileRepository.findOne({
            where: { 
                user: { id }    
            },
        });

        if(!profile){
            throw new NotFoundException(`Profile not found`);
        }
        return profile;
    }

    async updateProfile(id: string, profileData: UpdateProfileDto): Promise<Profile>{
        const profile = await this.findProfile(id);
        Object.assign(profile, profileData);

        return this.profileRepository.save(profile);
    }
}