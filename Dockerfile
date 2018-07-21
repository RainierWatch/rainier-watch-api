FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

# For prod: RUN npm install --only=production
RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]