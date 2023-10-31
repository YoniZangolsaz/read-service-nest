import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/common/mongo/repositories/user.repository';
import { TasksService } from 'src/common/schedule/daily';
import { DataAccess } from 'src/data-access/dataAccess';
import { User } from '../common/mongo/schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tasksService: TasksService,
    private readonly dataAccess: DataAccess,
  ) {
    this.tasksService.startCronJob(async () => {
      console.log('Start Getting all the data');
      const data = await this.findAll();

      console.log(`Finish Getting all the data${data.length}`);
    });
  }

  async findAll(): Promise<User[]> {
    const allData = await this.dataAccess.getData();

    if (allData && allData.length && allData.length > 1) {
      await this.userRepository.deleteMany();
      await this.userRepository.insetMany(allData);
    }

    const all = await this.userRepository.findAll();
    return all;
  }

  async findAllDB(): Promise<User[]> {
    const all = await this.userRepository.findAll();
    return all;
  }

  async findByPersonalNumber(personalNumber: string): Promise<User> {
    const person =
      await this.userRepository.findByPersonalNumber(personalNumber);

    return person;
  }

  async findByIdentityCard(identityCard: string): Promise<User> {
    const person = await this.userRepository.findByIdentityCard(identityCard);
    return person;
  }

  async findByUser(user: string): Promise<User> {
    const person = await this.userRepository.findByUser(user);
    return person;
  }
}
