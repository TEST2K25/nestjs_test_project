import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // constructor(private readonly configService: ConfigService) {}

  // getPort(): string {
  //   return this.configService.get<string>('PORT');
  // }

  // getDatabaseUrl(): string {
  //   return this.configService.get<string>('DB_URL');
  // }
}
