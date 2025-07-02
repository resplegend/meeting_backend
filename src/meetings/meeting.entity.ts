import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  location: string;

  @Column('text', { array: true })
  attendees: string[];

  @ManyToOne(() => User)
  createdBy: User;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
} 