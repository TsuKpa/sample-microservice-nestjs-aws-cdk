import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/ping-a')
  async pingServiceA() {
    return await this.appService.pingServiceA();
  }

  @Get('/ping-b')
  async pingServiceB() {
    return await this.appService.pingServiceB();
  }

  @Get('/ping-tcp-a')
  async pingClientA() {
    return await this.appService.pingClientA();
  }

  @Get('/ping-tcp-b')
  async pingClientB() {
    return await this.appService.pingClientB();
  }
}
