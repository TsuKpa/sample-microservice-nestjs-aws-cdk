import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TcpClientOptions, Transport } from '@nestjs/microservices';
import { HealthCheckService, MicroserviceHealthIndicator } from '@nestjs/terminus';

@Injectable()
export class AppService {
  serviceA: {
    host: string;
    port: number;
  };
  serviceB: {
    host: string;
    port: number;
  };
  constructor(
    private health: HealthCheckService,
    private tcp: MicroserviceHealthIndicator,
    private configService: ConfigService
  ) {
    this.serviceA = {
      host: this.configService.get<string>('SERVICE_A_HOST') || 'localhost',
      port: this.configService.get<number>('SERVICE_A_PORT') || 3000,
    };
    this.serviceB = {
      host: this.configService.get<string>('SERVICE_B_HOST') || 'localhost',
      port: this.configService.get<number>('SERVICE_B_PORT') || 3000,
    };
  }

  getHello(): string {
    return 'Hello World!';
  }

  async pingServiceA() {
    return await this.health.check([
      () => this.tcp.pingCheck<TcpClientOptions>('ping-service-a', {
        transport: Transport.TCP,
        options: { host: this.serviceA.host, port: this.serviceA.port },
        timeout: 800
      }),
    ]);
  }

  async pingServiceB() {
    return await this.health.check([
      () => this.tcp.pingCheck<TcpClientOptions>('ping-service-b', {
        transport: Transport.TCP,
        options: { host: this.serviceB.host, port: this.serviceB.port },
        timeout: 800
      }),
    ]);
  }
}
