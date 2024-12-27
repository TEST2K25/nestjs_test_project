import {
  // BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { ResetPassword } from './entities/reset.entity';
import { UserSignUpDto } from './dto/user-signup.dto';
import * as bcrypt from 'bcrypt';
// import { UserLoginDto } from './dto/user-login.dto';
// import { AuthService } from 'src/auth/auth.service';
// import {
//   ChnagePasswordDto,
//   ResetEmailDto,
//   ValidateOtpDto,
// } from './dto/user-password-reset.dto';

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
      const user = await this.userModel.findOne({
        userEmail: userSignUpDto.userEmail,
      });
      console.log('User is ', user);

      if (user) {
        throw new UnauthorizedException('User Already Exists');
      }

      // hash the password and save to db
      const hashedPassword = await bcrypt.hash(userSignUpDto.password, 10);

      const newUser = new this.userModel({
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
  // user login
  // async userLogin(userLoginDto: UserLoginDto) {
  //   try {
  //     // check user exist or not
  //     const user = await this.userModel.findOne({
  //       userEmail: userLoginDto.userEmail,
  //     });

  //     // error if user does not exists
  //     if (!user) {
  //       throw new UnauthorizedException("User does't exists");
  //     }

  //     // confirm password
  //     const isPasswordCorrect = await bcrypt.compare(
  //       userLoginDto.password,
  //       user.password,
  //     );

  //     // console.log('Matched password of bcrypt is:-', isPasswordCorrect);
  //     if (!isPasswordCorrect) {
  //       throw new UnauthorizedException('Incorrect password');
  //     }

  //     const token = this.authServices.generateToken(
  //       userLoginDto.userEmail,
  //       user._id as string,
  //     );

  //     // console.log('Generated token is:-', token);

  //     return {
  //       message: 'Login Successfully!',
  //       data: {
  //         token: token,
  //         data: {
  //           userName: user.userName,
  //           userEmail: user.userEmail,
  //           userId: user._id,
  //           accessType: user.accessType,
  //         },
  //       },
  //     };
  //   } catch (error) {
  //     throw new UnauthorizedException(error.message);
  //   }
  // }
  // get user details when valid token is present
  // async userGetDetails(authUser) {
  //   //  user details after auth guard
  //   const { userId } = authUser;

  //   // find out the user using userId
  //   const user = await this.userModel.findById(userId);

  //   if (!user) {
  //     throw new Error('User not found');
  //   }

  //   return {
  //     message: 'Waw!!!!..User get successfully',
  //     data: {
  //       userName: user.userName,
  //       userEmail: user.userEmail,
  //       userId: user._id,
  //       accessType: user.accessType,
  //     },
  //   };
  // }

  // Send otp to reset password
  // async passwordResetOtp(resetEmailDto: ResetEmailDto) {
  //   try {
  //     console.log('Reset email is', resetEmailDto);
  //     // check userEmail exist in data base or not
  //     const user = await this.userModel.findOne({
  //       userEmail: resetEmailDto.userEmail,
  //     });

  //     // if no email present then throw an error
  //     if (!user) throw new Error("Email does't exist");

  //     // generate 6 digit otp
  //     const otpPassword = Math.floor(
  //       100000 + Math.random() * 900000,
  //     ).toString();
  //     console.log('Gerenared otp is:-', otpPassword);
  //     const hashedOtp = await bcrypt.hash(otpPassword, 10);
  //     const expiresAt = new Date();
  //     expiresAt.setMinutes(expiresAt.getMinutes() + 10); // OTP valid for 10 minutes
  //     // if otp temp exist then first delete it and create new entries
  //     await this.resetPasswordModel.deleteOne({ userEmail: user.userEmail });

  //     // save that details to the temp otpmodel
  //     const tempValidator = new this.resetPasswordModel({
  //       userEmail: resetEmailDto.userEmail,
  //       otp: hashedOtp,
  //       expiredAt: expiresAt,
  //     });
  //     await tempValidator.save();

  //     //send otp to the user's mail id

  //     // const mailOptions = {
  //     //   from: process.env.ADMIN_GMAIL,
  //     //   to: user.userEmail,
  //     //   subject: 'Your OTP Code',
  //     //   text: `Your OTP is: ${otpPassword}. It will valid for 10 minutes only`,
  //     // };

  //     // uncomment after providing the admin mail and credentials to env

  //     // await mailSender.sendMail(mailOptions);
  //     return {
  //       message: 'Reset otp sent to your email id',
  //       data: { otp: otpPassword },
  //     };
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  // }

  // validate otp
  // async validateResetOtp(validateOtpDto: ValidateOtpDto) {
  //   console.log('user email and password is', validateOtpDto);
  //   try {
  //     // is user exits
  //     const user = await this.userModel.findOne({
  //       userEmail: validateOtpDto.userEmail,
  //     });
  //     console.log('user is', user);
  //     if (!user) {
  //       throw new Error('Invalid Email! Check and Retry');
  //     }

  //     // access the otp model
  //     const otpDetails = await this.resetPasswordModel.findOne({
  //       userEmail: validateOtpDto.userEmail,
  //     });
  //     console.log('the otpmodel values are', otpDetails);
  //     if (!otpDetails) {
  //       throw new Error('Request Expired');
  //     }

  //     // OTp expired or not
  //     if (new Date(otpDetails.expiredAt) < new Date()) {
  //       throw new Error('Otp has been expired..');
  //     }

  //     // check is otp correct or not
  //     const isOtpValid = await bcrypt.compare(
  //       validateOtpDto.otp,
  //       otpDetails.otp,
  //     );
  //     if (!isOtpValid) {
  //       throw new Error('Incorrect Otp');
  //     }
  //     // if otp validated then delete that entry

  //     return {
  //       message: 'OTP validated',
  //     };
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  // }

  // change user password
  // async changeUserPassword(chnagePasswordDto: ChnagePasswordDto) {
  //   console.log('user email and password is', chnagePasswordDto);
  //   try {
  //     // is user exits
  //     const user = await this.userModel.findOne({
  //       userEmail: chnagePasswordDto.userEmail,
  //     });
  //     console.log('user is', user);
  //     if (!user) {
  //       throw new Error('Invalid Email! Check and Retry');
  //     }

  //     // access the otp model
  //     const otpDetails = await this.resetPasswordModel.findOne({
  //       userEmail: chnagePasswordDto.userEmail,
  //     });
  //     console.log('the otpmodel values are', otpDetails);
  //     if (!otpDetails) {
  //       throw new Error('Request Expired');
  //     }

  //     // OTp expired or not
  //     if (new Date(otpDetails.expiredAt) < new Date()) {
  //       throw new Error('Otp has been expired..');
  //     }

  //     // check is otp correct or not
  //     const isOtpValid = await bcrypt.compare(
  //       chnagePasswordDto.otp,
  //       otpDetails.otp,
  //     );
  //     if (!isOtpValid) {
  //       throw new Error('Incorrect Otp');
  //     }
  //     // password and confirm password validation
  //     if (chnagePasswordDto.password !== chnagePasswordDto.confirmPassword) {
  //       console.log('Password is not same here....');
  //       throw new Error('Password and Confirm Password must be same');
  //     } else if (chnagePasswordDto.password.length < 8) {
  //       throw new Error('Password must be at least 8 characters long');
  //     }
  //     // first hash the password and store to db
  //     const hashedNewPassword = await bcrypt.hash(
  //       chnagePasswordDto.password,
  //       10,
  //     );

  //     // update that password to the user model
  //     user.password = hashedNewPassword;
  //     await user.save();

  //     // also delete that entry from the otp model
  //     await this.resetPasswordModel.deleteOne({ userEmail: user.userEmail });

  //     return {
  //       message: 'Waw! Password changed successfully',
  //     };
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  // }
}
