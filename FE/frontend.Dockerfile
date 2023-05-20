FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json .
RUN npm install

# Copy app files
COPY src .

# Build the app
RUN npm run build

EXPOSE 3000

# Start the app
CMD npm run dev
