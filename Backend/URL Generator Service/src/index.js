import express from 'express';
import { shortURL } from './controllers/url-gen-controller.js';
import { connectToDatabase, pool } from './lib/db.js';
import redis from "../src/lib/redis.js";
import cors from 'cors';

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors({
    origin: '*',
}));
const router = express.Router();

router.post('/shorten', shortURL);
app.use('/api', router);
connectToDatabase();
app.listen(port, () => {
    console.log("Server on ", port);
    connectToDatabase();
})
export default app;