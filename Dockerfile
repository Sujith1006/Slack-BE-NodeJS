FROM node:13.3.0
WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app
COPY package*.json ./
ENV PATH /usr/src/node_modules/.bin:$PATH
RUN npm install
RUN npm install mysql2
COPY . .
EXPOSE 8081
# You can change this
CMD [ "node","authenticate.js"]