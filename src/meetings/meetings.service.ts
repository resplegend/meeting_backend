import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meeting } from './meeting.entity';
import { User } from '../users/user.entity';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createMeetingDto: CreateMeetingDto, userId: number): Promise<Meeting> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    const meeting = this.meetingRepository.create({
      ...createMeetingDto,
      createdBy: user,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.meetingRepository.save(meeting);
  }

  async findAll(): Promise<Meeting[]> {
    return this.meetingRepository.find({ relations: ['createdBy'] });
  }

  async findOne(id: number): Promise<Meeting> {
    const meeting = await this.meetingRepository.findOne({ where: { id }, relations: ['createdBy'] });
    if (!meeting) {
      throw new NotFoundException(`Meeting with ID ${id} not found`);
    }
    return meeting;
  }

  async update(id: number, updateMeetingDto: UpdateMeetingDto): Promise<Meeting> {
    const meeting = await this.findOne(id);
    Object.assign(meeting, updateMeetingDto, { updatedAt: new Date() });
    return this.meetingRepository.save(meeting);
  }

  async remove(id: number): Promise<void> {
    const meeting = await this.findOne(id);
    await this.meetingRepository.remove(meeting);
  }
} 