import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: 'localhost',
  port: configService.get('DB_PORT'),
  database: configService.get('DB_NAME'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  autoLoadEntities: true,
  synchronize: true,
});