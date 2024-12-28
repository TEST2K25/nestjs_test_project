import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { ExpenseModule } from './expense/expense.module';
// import { ResourceModule } from './resource/resource.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
      envFilePath: '.env', // Path to the .env file (default is `.env`)
    }),
    UserModule,
    // ExpenseModule,
    // ResourceModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URL'), // Load DB_URL from .env
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
