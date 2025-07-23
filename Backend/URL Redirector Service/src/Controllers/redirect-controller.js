import { pool } from '../Lib/db.js';
import  redis  from '../Lib/redis.js';
function normalizeUrl(inputUrl) {
    if (!/^https?:\/\//i.test(inputUrl)) {
        return 'https://' + inputUrl;
    }
    return inputUrl;
}

export const redirectToURL = async (req, res) => {
    try {
        const { shortCode } = req.params;
        if (!shortCode) {
            return res.status(400).json({ error: 'Short code is required' });
        }
        const cacheValue = await redis.get('zaplink:' + shortCode);
        if (cacheValue) {
            console.log('Cache hit for short code:', shortCode);
            return res.redirect(cacheValue);
        }
        const result = await pool.query('SELECT original_url FROM urls WHERE short_code = $1', [shortCode]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Short code not found' });
        }
        const protocalBase = "http://";
        const originalUrl = normalizeUrl(result.rows[0].original_url);
        await redis.set('zaplink:' + shortCode, originalUrl, 'EX', 60 * 60 * 24);
        res.redirect(originalUrl);
    } catch (error) {
        console.error('Error redirecting to URL:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}