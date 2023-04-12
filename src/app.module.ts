import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './core/users/users.module';
import { AuthModule } from './core/auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CrewMembersModule } from './core/crew-members/crew-members.module';
import { ShipsModule } from './core/ships/ships.module';
import { StorageTankModule } from './core/storage-tank/storage-tank.module';
import { WastesModule } from './core/wastes/wastes.module';
import { CollectionRecordsModule } from './core/collection-records/collection-records.module';
import { SensorsModule } from './core/sensors/sensors.module';
import { SensorRecordsModule } from './core/sensor-records/sensor-records.module';
import { ReportsModule } from './core/reports/reports.module';
import { UserLogsModule } from './core/user-logs/user-logs.module';
import { UserLogsMiddleware } from '@/common/middleware/user.logger.middleware';
import { AuthHelper } from '@/common/helper/auth.helper';
import { JwtModule } from '@nestjs/jwt';
import { User } from '@/core/users/entities/user.entity';
import { getJwtConfig } from '@/config/jwt.config';
import {
  AcceptLanguageResolver,
  I18nModule,
} from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.resolve(__dirname, 'i18n/'),
        watch: true
      },
      resolvers: [AcceptLanguageResolver]
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
    AuthModule,
    CrewMembersModule,
    ShipsModule,
    StorageTankModule,
    WastesModule,
    CollectionRecordsModule,
    SensorsModule,
    SensorRecordsModule,
    ReportsModule,
    UserLogsModule,
  ],
  controllers: [AppController],
  providers: [
    AuthHelper,
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },

  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserLogsMiddleware).forRoutes('*');
  }
}
