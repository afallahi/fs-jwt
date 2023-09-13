import { Injectable, Logger, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from 'ioredis';

export class InvalidatedRefreshTokenError extends Error {}

@Injectable()
export class RefreshTokenStorage implements OnApplicationBootstrap, OnApplicationShutdown {
    private readonly logger = new Logger(RefreshTokenStorage.name);

    private redisClient: Redis;
    constructor(private configService: ConfigService) {}

    onApplicationBootstrap() {
        this.redisClient = new Redis({
            host: this.configService.get('REDIS_HOST'),
            port: this.configService.get('REDIS_PORT'),
        })
    }

    onApplicationShutdown(signal?: string) {
        return this.redisClient.quit();
    }

    private getKey(userId: number): string {
        return `user-${userId}`;
    }

    async insert(userId: number, token: string): Promise<void> {
        await this.redisClient.set(this.getKey(userId), token);
    }

    async validate(userId: number, token: string): Promise<boolean> {
        const storedToken = await this.redisClient.get(this.getKey(userId));
        if (storedToken !== token) {
            throw new InvalidatedRefreshTokenError();
        }
        return storedToken === token;
    }

    async invalidate(userId: number): Promise<void> {
        await this.redisClient.del(this.getKey(userId));
    }

}