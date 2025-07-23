import awsServerlessExpress from 'serverless-http';
import app from './src/index.js';

const server = (app);

export const handler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context);
};
