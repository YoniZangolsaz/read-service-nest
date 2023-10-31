import { Injectable } from '@nestjs/common';
import { CronJob } from 'cron';
import envConfig from '../config/env.config';

/**
 * *: Match every second
 * *: Match every minute
 * *: Match every hour
 * *: Match every day of month
 * *: Match every month
 * *: Match every day of week
 */

@Injectable()
export class TasksService {
  private cronJob: CronJob;

  async startCronJob(runFunction: () => Promise<void>) {
    await runFunction();

    const cronExpression = envConfig().cron;
    this.cronJob = new CronJob(cronExpression, async () => {
      console.log('Cron start');

      await runFunction();

      console.log('Cron end');
    });

    this.cronJob.start();
  }

  async cancelCronJOb() {
    this.cronJob.stop();
  }
}
