import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './DTO/user.dto.ts/user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'get all data from the real source' })
  async findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }
  @Get('all')
  @ApiOperation({ summary: 'get all data from the database' })
  async findAllDB(): Promise<UserDto[]> {
    return this.userService.findAllDB();
  }

  @Get('personalNumber/:personalNumber')
  @ApiOperation({ summary: 'get user by personal number' })
  async findByPersonalNumber(
    @Param('personalNumber') personalNumber: string,
  ): Promise<UserDto> {
    return this.userService.findByPersonalNumber(personalNumber);
  }

  @Get('identityCard/:identityCard')
  @ApiOperation({ summary: 'get user by identity card' })
  async findByIdentityCard(
    @Param('identityCard') identityCard: string,
  ): Promise<UserDto> {
    return this.userService.findByIdentityCard(identityCard);
  }

  @Get('user/:user')
  @ApiOperation({ summary: 'get user by user identifier' })
  async findByUser(@Param('user') user: string): Promise<UserDto> {
    return this.userService.findByUser(user);
  }
}
