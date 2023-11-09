import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Bookings from './modules/booking/booking.entity';
import { BookingModule } from './modules/booking/booking.module';
import Kuotas from './modules/kuota/kuota.entity';
import { KuotaModule } from './modules/kuota/kuota.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadController } from './modules/upload_data/upload.controller';
import { CronJobModule } from './schedule/schedule.module';
import Users from './modules/user/user.entity';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'Production'
          ? '.env.production'
          : '.env.development',
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req: any, file: any, cb: any) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => (Math.round(Math.random() * 16)).toString(16))
            .join('');
          const fileExt = extname(file.originalname);
          return cb(null, `${randomName}${fileExt}`);
        },
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      entities: [
        Bookings,
        Kuotas,
        Users
      ],
    }),
    AuthModule,
    BookingModule,
    KuotaModule,
    CronJobModule,
    UserModule
  ],
  controllers: [UploadController]
})
export class AppModule { }
