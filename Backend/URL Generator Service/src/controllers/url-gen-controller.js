import redis from "../lib/redis.js";
import encodeBase62 from "./encoder.js";
import { pool } from "../lib/db.js";

export const shortURL = async (req, res) => {
    try {
        const { longUrl } = req.body;
        const { userId } = req.body;
        console.log(userId);
        if (!longUrl) {
            return res.status(400).json({ error: 'Long URL is required' });
        }
        const existingQuery = userId
            ? 'SELECT * FROM urls WHERE original_url = $1 AND user_id = $2'
            : 'SELECT * FROM urls WHERE original_url = $1 AND user_id IS NULL';

        const existingParams = userId ? [longUrl, userId] : [longUrl];

        const result = await pool.query(existingQuery, existingParams);
        if (result.rows.length > 0) {
            const existingShortCode = result.rows[0].short_code;

            return res.status(200).json({ shortUrl: `${process.env.URL_REDIRECTOR_SERVICE}/${existingShortCode}` });
        }
        const shortURL = await generateShortURL(longUrl, userId);
        console.log('Short URL generated:', shortURL);
        res.status(200).json({ shortUrl: shortURL });

    }
    catch (error) {
        console.error('Error generating short URL:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

const generateShortURL = async (longUrl, userId) => {
    try {
        const counter = await redis.incr('zaplink:counter');
        console.log(counter);
        const shortCode = encodeBase62(counter);

        const insertQuery = userId
            ? 'INSERT INTO urls(short_code, original_url, user_id) VALUES ($1, $2, $3)'
            : 'INSERT INTO urls(short_code, original_url) VALUES ($1, $2)';

        const insertParams = userId ? [shortCode, longUrl, userId] : [shortCode, longUrl];
        await pool.query(insertQuery, insertParams);
        return { shortURL: `${process.env.URL_REDIRECTOR_SERVICE}/${shortCode}` };
    }
    catch (error) {
        console.error('Error generating short URL:', error);
        throw new Error('Internal server error');
    }
}