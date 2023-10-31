import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DataAccess {
  async getData(): Promise<any> {
    try {
      const data = await axios.get(
        'http://system-genesis-task.branch-yesodot.org/api/splitter/source/aka',
      );

      return data.data.slice(0, 10).map((r) => r.record);
    } catch (error) {
      console.log(error.data);
    }
  }
}
