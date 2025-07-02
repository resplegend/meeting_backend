import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsArray, IsOptional } from 'class-validator';

export class CreateMeetingDto {
  @ApiProperty({
    description: 'The title of the meeting',
    example: 'Team Standup'
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The description of the meeting',
    example: 'Daily team standup meeting'
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The start time of the meeting',
    example: '2024-01-15T09:00:00Z'
  })
  @IsDateString()
  startTime: Date;

  @ApiProperty({
    description: 'The end time of the meeting',
    example: '2024-01-15T10:00:00Z'
  })
  @IsDateString()
  endTime: Date;

  @ApiProperty({
    description: 'The location of the meeting',
    example: 'Conference Room A'
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'List of attendee emails',
    example: ['john@example.com', 'jane@example.com'],
    type: [String]
  })
  @IsArray()
  @IsString({ each: true })
  attendees: string[];
} 