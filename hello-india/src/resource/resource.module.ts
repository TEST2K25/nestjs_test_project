import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { Resource, ResourceSchema } from './entities/resource.entity';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Resource.name, schema: ResourceSchema },
    ]),
  ],
  providers: [ResourceService],
  controllers: [ResourceController],
})
export class ResourceModule {}
