import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@ApiTags('Meetings')
@ApiBearerAuth()
@Controller('meetings')
@UseGuards(JwtAuthGuard)
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new meeting' })
  @ApiBody({ type: CreateMeetingDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Meeting created successfully',
    type: Object
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createMeetingDto: CreateMeetingDto, @Request() req) {
    return this.meetingsService.create(createMeetingDto, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all meetings' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all meetings',
    type: [Object]
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.meetingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a meeting by ID' })
  @ApiParam({ name: 'id', description: 'Meeting ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Meeting found',
    type: Object
  })
  @ApiResponse({ status: 404, description: 'Meeting not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findOne(@Param('id') id: string) {
    return this.meetingsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a meeting' })
  @ApiParam({ name: 'id', description: 'Meeting ID' })
  @ApiBody({ type: UpdateMeetingDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Meeting updated successfully',
    type: Object
  })
  @ApiResponse({ status: 404, description: 'Meeting not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(@Param('id') id: string, @Body() updateMeetingDto: UpdateMeetingDto) {
    return this.meetingsService.update(+id, updateMeetingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a meeting' })
  @ApiParam({ name: 'id', description: 'Meeting ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Meeting deleted successfully'
  })
  @ApiResponse({ status: 404, description: 'Meeting not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Param('id') id: string) {
    return this.meetingsService.remove(+id);
  }
} 