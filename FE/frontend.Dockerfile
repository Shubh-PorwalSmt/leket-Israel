FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json .
RUN npm install

# Copy app files
COPY . .

# Install pm2
RUN npm install pm2 -g

# Start the app
CMD pm2 start --name frontend npm -- start
