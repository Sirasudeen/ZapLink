import express from 'express';
import { connectToDatabase } from './Lib/db.js';
import { connectToRedis } from './Lib/redis.js';
import { redirectToURL } from './controllers/redirect-controller.js';
const app = express();
const port = 3000;
express.json();

const router = express.Router();

app.use('/api', router);
router.get('/:shortCode', redirectToURL);
app.listen(port, () => {
    connectToDatabase();
    connectToRedis();
    console.log(`Server is running on http://localhost:${port}`);
});