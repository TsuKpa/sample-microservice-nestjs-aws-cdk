import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigModule } from './config.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    CustomConfigModule,
    TerminusModule.forRoot({
      errorLogStyle: 'pretty',
    }),
    HttpModule,
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'SERVICE_A',
          imports: [CustomConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            return {
              name: 'SERVICE_A',
              transport: Transport.TCP,
              options: {
                host: configService.get<string>('SERVICE_A_HOST') || 'localhost',
                port: configService.get<number>('SERVICE_A_PORT') || 3001,
              }
            }
          }
        },
        {
          name: 'SERVICE_B',
          imports: [CustomConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            return {
              name: 'SERVICE_B',
              transport: Transport.TCP,
              options: {
                host: configService.get<string>('SERVICE_B_HOST') || 'localhost',
                port: configService.get<number>('SERVICE_B_PORT') || 3002,
              }
            }
          }
        }
      ]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
