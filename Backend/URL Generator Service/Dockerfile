# Use Lambda's Node.js 20 base image
FROM public.ecr.aws/lambda/nodejs:20

# Set working directory
WORKDIR /var/task

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Set the Lambda handler (file.function)
CMD [ "lambda.handler" ]
