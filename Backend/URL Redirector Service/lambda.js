import ServerlessHttp from "serverless-http";
import app from './src/index.js'

const server = ServerlessHttp(app);

export const handler = async (event,context) => {
        return await server(event, context);
}