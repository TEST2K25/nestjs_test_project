import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserSignUpDto } from "./dto/user-signup.dto";


@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService) {}
//    signup user
    @Post('user-signup')
  async userSignUp(@Body() userSignUpDto: UserSignUpDto) {
    return this.userService.userSignUp(userSignUpDto);
  }

}   