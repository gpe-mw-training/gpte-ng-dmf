# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:10 as build-stage
WORKDIR /app
COPY ./ /app/
RUN npm install -g @angular/cli > /dev/null
RUN npm install
RUN ng build
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:stable-alpine
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
# Copy the default nginx.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080