import { createClient } from 'redis';

// Create a Redis client
export const client = createClient({
    host: 'localhost',
    port: 6379
});

// Handle connection events
client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

