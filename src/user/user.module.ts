import { TasksService } from './../common/schedule/daily';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../common/mongo/schema/user.schema';
import { UserRepository } from 'src/common/mongo/repositories/user.repository';
import { DataAccess } from 'src/data-access/dataAccess';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, TasksService, DataAccess],
})
export class UserModule {}
