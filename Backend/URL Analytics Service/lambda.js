import { flushAnalyticsData } from './src/controllers/flush-controller.js';

export const handler = async (event, context) => {
    console.log('Scheduled analytics flush job triggered.');

    const result = await flushAnalyticsData();

    return result;
};
