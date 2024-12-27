import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./entities/user.entity";
import { Model } from "mongoose";
import { ResetPassword } from "./entities/reset.entity";
import { UserSignUpDto } from "./dto/user-signup.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(ResetPassword.name)
        private readonly resetPasswordModel: Model<ResetPassword>,
        // private readonly authServices: AuthService,
      ) {}

    //user singup
  async userSignUp(userSignUpDto: UserSignUpDto) {
    // check confirmpassword and password is same
    if (userSignUpDto.password !== userSignUpDto.confirmPassword) {
      throw new UnauthorizedException(
        'Confirm password must be same as password',
      );
    }
    console.log('userSignUpdto', userSignUpDto);
    try {
      // Check for exisiting user
      let user = await this.userModel.findOne({
        userEmail: userSignUpDto.userEmail,
      });
      console.log('User is ', user);

      if (user) {
        throw new UnauthorizedException('User Already Exists');
      }

      // hash the password and save to db
      let hashedPassword = await bcrypt.hash(userSignUpDto.password, 10);

      let newUser = new this.userModel({
        ...userSignUpDto,
        password: hashedPassword,
      });

      newUser.save();

      console.log('New user is', newUser);

      return {
        message: 'User Successfully created.',
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

}