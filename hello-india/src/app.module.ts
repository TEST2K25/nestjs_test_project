import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { ExpenseModule } from './expense/expense.module';
// import { ResourceModule } from './resource/resource.module';

@Module({
  imports: [
    UserModule,
    // ExpenseModule,
    // ResourceModule,
    MongooseModule.forRoot(
      'mongodb+srv://rough2k25:c1TZNryekbAnXrvf@onestepinternalsystemdb.yjppo.mongodb.net/?retryWrites=true&w=majority&appName=onestepInternalSystemDb',
    ),
  ],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
