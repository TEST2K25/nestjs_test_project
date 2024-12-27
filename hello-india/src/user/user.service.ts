import { Injectable } from "@nestjs/common";


@Injectable()
export class UserService {

    async getUser() {
        return 'Hello User from services';
    }

}