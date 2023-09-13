import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
    imports: [
        NestConfigModule.forRoot({
            envFilePath: ['.env', 'config/.env.example'],
        }),
    ],
    exports: [NestConfigModule],
})
export class ConfigurationModule {}