import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./entities/user.entity";
import { ResetPassword, ResetPasswordSchema } from "./entities/reset.entity";


@Module({
    imports: [ MongooseModule.forFeature([
        { name: User.name, schema: UserSchema },
        { name: ResetPassword.name, schema: ResetPasswordSchema },
      ]),],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}