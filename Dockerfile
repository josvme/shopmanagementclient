# First temporary container to build the vuejs app
FROM node:10.16-alpine as build-node

# prepare build dir
RUN mkdir -p /app/assets
WORKDIR /app

# Manually copy all required files.
COPY package.json package-lock.json ./assets/
COPY vue.config.js ./assets/vue.config.js
COPY src ./assets/src/
COPY .env ./assets/.env
COPY babel.config.js ./assets/babel.config.js
COPY postcss.config.js ./assets/
COPY tsconfig.json ./assets/
RUN cd assets && npm install --dev --force

# Build our application
RUN cd assets && npm run build

# Our production Vuejs app. We will serve it from nginx directly as they are all static.
FROM nginx
# Listen on port 80
EXPOSE 80

# As you can notice, we just reuse the nginx.conf file we used before with a small change.
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# copy all build artificats from build-node. Notice the --from
COPY --from=build-node /app/assets/dist/ /usr/share/nginx/html/