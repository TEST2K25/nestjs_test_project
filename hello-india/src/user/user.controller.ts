import {
  Body,
  Controller,
  // Get,
  Post,
  // Put,
  // Request,
  // UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignUpDto } from './dto/user-signup.dto';
// import { UserLoginDto } from './dto/user-login.dto';
// import { JwtAuthGuard } from 'src/auth/auth.guard';
// import { Req_Int } from 'src/interface/common';
// import {
//   ChnagePasswordDto,
//   ResetEmailDto,
//   ValidateOtpDto,
// } from './dto/user-password-reset.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //    signup user
  @Post('user-signup')
  async userSignUp(@Body() userSignUpDto: UserSignUpDto) {
    return this.userService.userSignUp(userSignUpDto);
  }
  // to login user
  // @Post('user-login')
  // async userLogin(@Body() userLoginDto: UserLoginDto) {
  //   return this.userService.userLogin(userLoginDto);
  // }

  // get-user details
  // @UseGuards(JwtAuthGuard)
  // @Get('get-user')
  // async userGetDetails(@Request() req: Req_Int) {
  //   return this.userService.userGetDetails(req.user);
  // }

  // sent otp to reset password
  // @Post('send-otp')
  // userGetResetOtp(@Body() resetEmailDto: ResetEmailDto) {
  //   return this.userService.passwordResetOtp(resetEmailDto);
  // }

  // validate entered otp
  // @Post('validate-otp')
  // userValidateResetOtp(@Body() validateOtpDto: ValidateOtpDto) {
  //   return this.userService.validateResetOtp(validateOtpDto);
  // }

  // change password
  // @Put('change-password')
  // userChangePassword(@Body() chnagePasswordDto: ChnagePasswordDto) {
  //   return this.userService.changeUserPassword(chnagePasswordDto);
  // }

  // test route
  // @Get('test')
  // testRoute() {
  //   return '<div>Test route is working fineeeeee</div>';
  // }
}
