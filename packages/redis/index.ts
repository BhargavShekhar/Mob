import { createClient } from "redis";

export const redisClinet = createClient({
    url: process.env.REDIS_CLIENT
})