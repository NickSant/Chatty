FROM node:alpine

# create & set working directory
RUN mkdir -p /usr/src/chatty
WORKDIR /usr/src/chatty

# copy source files
COPY . /usr/src/chatty

# install dependencies
RUN npm install

# start app
RUN npm run build
EXPOSE 3000
CMD npm run start