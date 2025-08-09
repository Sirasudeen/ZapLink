import { pool } from './lib/db.js';
import redis from './lib/redis.js';

export const flushAnalyticsData = async () => {
    console.log('Starting analytics flush job...');

    try {
        let cursor = '0';
        const keysToDelete = [];
        const analyticsData = [];

        do {
            const [newCursor, keys] = await redis.scan(cursor, 'MATCH', 'analytics:clicks:*', 'COUNT', 100);
            cursor = newCursor;

            if (keys.length > 0) {
                const counts = await redis.mget(...keys);

                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    const count = parseInt(counts[i], 10);
                    const shortCode = key.split(':')[2];

                    if (!isNaN(count) && count > 0) {
                        analyticsData.push({ shortCode, count });
                        keysToDelete.push(key);
                    }
                }
            }
        } while (cursor !== '0');

        if (analyticsData.length === 0) {
            console.log('No new analytics data to flush. Job finished.');
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'No new analytics data to flush.' }),
            };
        }

        console.log(`Found ${analyticsData.length} links with new clicks to process.`);

        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const updateQuery = `
                INSERT INTO analytics (short_code, click_count)
                SELECT unnest($1::text[]), unnest($2::int[])
                ON CONFLICT (short_code) 
                DO UPDATE SET click_count = analytics.click_count + EXCLUDED.click_count;
            `;

            const shortCodes = analyticsData.map(d => d.shortCode);
            const counts = analyticsData.map(d => d.count);

            await client.query(updateQuery, [shortCodes, counts]);

            await client.query('COMMIT');
            console.log('Successfully flushed analytics data to PostgreSQL.');
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }

        if (keysToDelete.length > 0) {
            await redis.del(...keysToDelete);
            console.log(`Successfully cleared ${keysToDelete.length} keys from Redis.`);
        }

        console.log('Analytics flush job completed successfully.');
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Analytics data flushed successfully.' }),
        };

    } catch (error) {
        console.error('Error during analytics flush job:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'An error occurred during the flush job.' }),
        };
    }
};
