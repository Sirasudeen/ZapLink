import Redis from 'ioredis';
import Dotenv from 'dotenv';
Dotenv.config();

export const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    db: process.env.REDIS_DB || 0,
    retryStrategy: (times) => {
        return Math.min(times * 50, 2000); // Retry every 50ms, up to 2 seconds
    }
})

export const connectToRedis = async () => {
    try {
        redis.on('connect', () => {
            console.log('Connected to Redis');
        });

        redis.on('error', (err) => {
            console.error('Redis connection error:', err);
        });

    }
    catch (err) {
        console.error("Redis connection error:", err);
        throw new Error("Failed to connect to Redis");
    }
}
