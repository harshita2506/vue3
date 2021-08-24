FROM node:10-alpine
# install simple http server for serving static content
RUN npm install -g http-server
WORKDIR /app
# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./
RUN npm install
COPY . .
#RUN npm run build
EXPOSE 8080
#CMD [ "http-server", "dist" ]
CMD ["npm", "run", "serve"]