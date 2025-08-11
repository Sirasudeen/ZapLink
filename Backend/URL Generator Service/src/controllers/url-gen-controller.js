import redis from "../lib/redis.js";
import encodeBase62 from "./encoder.js";
import { pool } from "../lib/db.js";
import { supabase } from "../lib/supabase.js";

export const shortURL = async (req, res) => {
    try {
        const { longUrl } = req.body;
        const authHeader = req.headers.authorization;
        let userId = null;

        if (!longUrl) {
            return res.status(400).json({ error: 'Long URL is required' });
        }

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const { data: { user } } = await supabase.auth.getUser(token);
            if (user) {
                userId = user.id;
            }
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

        const newShortUrl = await generateShortURL(longUrl, userId);
        res.status(200).json({ shortUrl: newShortUrl });

    } catch (error) {
        console.error('Error generating short URL:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const generateShortURL = async (longUrl, userId) => {
    try {
        const counter = await redis.incr('zaplink:counter');
        const shortCode = encodeBase62(counter);

        const insertQuery = userId
            ? 'INSERT INTO urls(short_code, original_url, user_id) VALUES ($1, $2, $3)'
            : 'INSERT INTO urls(short_code, original_url) VALUES ($1, $2)';

        const insertParams = userId ? [shortCode, longUrl, userId] : [shortCode, longUrl];

        await pool.query(insertQuery, insertParams);

        return { shortURL: `${process.env.URL_REDIRECTOR_SERVICE}/${shortCode}` };
    } catch (error) {
        console.error('Error in generateShortURL:', error);
        throw new Error('Internal server error');
    }
};

export const getUserLinks = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized: No token provided.' });
        }
        const token = authHeader.split(' ')[1];

        const { data: { user }, error: userError } = await supabase.auth.getUser(token);

        if (userError || !user) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
        }

        const query = `
            SELECT 
                u.id, 
                u.original_url, 
                u.short_code, 
                u.created_at,
                COALESCE(a.click_count, 0) as click_count
            FROM 
                urls u
            LEFT JOIN 
                analytics a ON u.short_code = a.short_code
            WHERE 
                u.user_id = $1
            ORDER BY 
                u.created_at DESC;
        `;

        const { rows } = await pool.query(query, [user.id]);

        res.status(200).json(rows);

    } catch (error) {
        console.error('Error fetching user links:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
