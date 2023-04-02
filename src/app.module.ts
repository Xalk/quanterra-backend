import { ClassSerializerInterceptor, Module } from '@nestjs/common';
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

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    UsersModule,
    AuthModule,
    CrewMembersModule,
    ShipsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {
}
