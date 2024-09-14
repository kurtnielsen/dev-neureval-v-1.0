FROM node:latest

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

# Start the application in production mode
CMD ["npm", "start"]