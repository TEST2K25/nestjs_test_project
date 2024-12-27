import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [UserModule,
   MongooseModule.forRoot('mongodb+srv://rough2k25:c1TZNryekbAnXrvf@onestepinternalsystemdb.yjppo.mongodb.net/?retryWrites=true&w=majority&appName=onestepInternalSystemDb')
  ],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
