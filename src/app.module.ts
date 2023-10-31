import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import envConfig from './common/config/env.config';
import { ScheduleModule } from '@nestjs/schedule';
import { MorganInterceptor } from './interceptor/morgan.interceptor';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ load: [envConfig] }),
    MongooseModule.forRoot(envConfig().database.host),
    UserModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: MorganInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
}
