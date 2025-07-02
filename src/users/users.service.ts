import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user || undefined;
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user || undefined;
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  // Optionally, add a method to seed an admin user
  async seedAdmin() {
    const adminEmail = 'admin@gmail.com';
    const existing = await this.findByEmail(adminEmail);
    if (!existing) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await this.create({
        email: adminEmail,
        password: hashedPassword,
        name: 'Admin',
      });
    }
  }
}