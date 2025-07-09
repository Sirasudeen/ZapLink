import express from 'express';
import { shortURL } from './controllers/url-gen-controller.js';
import { connectToDatabase, pool } from './lib/db.js';
import redis from "../src/lib/redis.js";
const app = express();
const port = 3000;
app.use(express.json());

const router = express.Router();
redis.set("siras", "katchu");
const value = await redis.get("siras");
console.log("Siras:", value);

router.post('/shorten', shortURL);
app.use('/api', router); // then your endpoint is POST /api/shorten

app.listen(port, () => {
    connectToDatabase();
    console.log(`Server is running on http://localhost:${port}`);
});