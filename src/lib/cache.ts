import { createClient } from 'redis';
const redis = createClient({
    url: process.env.REDIS_URL,
});

void redis.connect();

import superjson from 'superjson';

export function writeToCache<T>(key: string, value: T) {
    return redis.set(key,
        superjson.stringify(value),
    );
}

export async function readFromCache<T>(key: string): Promise<T | null> {
    const value = await redis.get(key);
    if (!value) {
        return null;
    }
    return superjson.parse(value);
}