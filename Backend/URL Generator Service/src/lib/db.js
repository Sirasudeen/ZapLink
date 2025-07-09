import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const connectToDatabase = async () => {
    await pool.connect()
        .then(() => console.log("Connected to the database"))
        .catch(err => console.error("Database connection error:", err));
};

