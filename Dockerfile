FROM node:latest as build

RUN mkdir /app
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run-script build

FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
