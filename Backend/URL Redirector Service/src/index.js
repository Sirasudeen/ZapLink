import express from 'express';
import { connectToDatabase } from './Lib/db.js';
import { connectToRedis } from './Lib/redis.js';
import { redirectToURL } from './Controllers/redirect-controller.js';
const app = express();
const port = 3001;
express.json();

const router = express.Router();

app.use('/api', router);
router.get('/:shortCode', redirectToURL);
app.listen(port, () => {
    connectToDatabase();
    connectToRedis();
    console.log(`Server is running on http://localhost:${port}`);
});