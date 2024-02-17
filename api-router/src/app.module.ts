import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigModule } from './config.module';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [CustomConfigModule, TerminusModule.forRoot({
    errorLogStyle: 'pretty',
  }), HttpModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'SERVICE_A',
    useFactory: (configService: ConfigService) => {
      return ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
          host: configService.get<string>('SERVICE_A_HOST') || 'service-a',
          port: configService.get<number>('SERVICE_A_PORT') || 3000,
        },
      });
    },
    inject: [ConfigService],
  },
    {
      provide: 'SERVICE_B',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('SERVICE_B_HOST') || 'service-b',
            port: configService.get<number>('SERVICE_B_PORT') || 3000,
          },
        });
      },
      inject: [ConfigService],
    }
  ],
})
export class AppModule { }
