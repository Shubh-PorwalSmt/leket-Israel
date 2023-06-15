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

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 3000 8080

ENTRYPOINT ["nginx", "-g", "daemon off;"]
