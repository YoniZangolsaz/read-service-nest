import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import envConfig from 'src/common/config/env.config';
import { User } from '../schema/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(userDto: User) {
    const createdUser = new this.userModel(userDto);
    const res = await createdUser.save();
    return res;
  }
  async findAll() {
    const res = await this.userModel.find();
    return res;
  }
  async find(id: string) {
    const res = await this.userModel.findById(id);
    return res;
  }
  async update(id: string, userDto: User) {
    const res = await this.userModel.findByIdAndUpdate(id, userDto);
    return res;
  }
  async delete(id: string) {
    const res = await this.userModel.findByIdAndRemove(id);
    return res;
  }

  async findByPersonalNumber(personalNumber: string): Promise<User> {
    const person = await this.userModel.findOne({
      [envConfig().database.queries.personalNumber]: personalNumber,
    });
    return person;
  }

  async findByIdentityCard(identityCard: string): Promise<User> {
    const person = await this.userModel.findOne({
      [envConfig().database.queries.identityCard]: identityCard,
    });
    return person;
  }

  async findByUser(user: string): Promise<User> {
    const person = await this.userModel.findOne({
      [envConfig().database.queries.user]: user,
    });
    return person;
  }

  async insetMany(users: User[]) {
    return await this.userModel.insertMany(users);
  }

  async deleteMany() {
    return await this.userModel.deleteMany();
  }
}
