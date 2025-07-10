import redis from "../lib/redis.js";
import encodeBase62 from "./encoder.js";
import { pool } from "../lib/db.js";

export const shortURL = async (req, res) => {
    try {
        const { longUrl } = req.body;
        if (!longUrl) {
            return res.status(400).json({ error: 'Long URL is required' });
        }
        const result = await pool.query(
            'SELECT * FROM urls WHERE original_url = $1', [longUrl]);
        if (result.rows.length > 0) {
            const existingShortCode = result.rows[0].short_code;
            return res.status(200).json({ shortUrl: `${process.env.BASE_URL}/${existingShortCode}` });
        }
        const shortURL = await generateShortURL(longUrl);

        res.status(200).json({ shortUrl: shortURL });

    }
    catch (error) {
        console.error('Error generating short URL:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

const generateShortURL = async (longUrl) => {
    try {
        const counter = await redis.incr('zaplink:counter');

        const shortCode = encodeBase62(counter);

        await pool.query(
            'INSERT INTO urls(short_code,original_url) VALUES ($1,$2)', [shortCode, longUrl]
        );
        return { shortURL: `${process.env.BASE_URL}/${shortCode}` };
    }
    catch (error) {
        console.error('Error generating short URL:', error);
        throw new Error('Internal server error');
    }
}