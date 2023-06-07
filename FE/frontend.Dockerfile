# Stage 1
FROM node:16-alpine as builder

WORKDIR /usr/src/app

COPY package.json .
RUN npm install

# Copy app files
COPY . .

# Build the app
RUN npm run build

# Stage 2
FROM nginx:1.19-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /usr/src/app/dist .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
