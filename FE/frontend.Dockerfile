FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json .
RUN npm install

# Copy app files
COPY . .
RUN ls -la
# Build the app
RUN npm run build

WORKDIR dist

# Start the app
CMD npm run serve
