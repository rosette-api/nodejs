FROM node:4.2.6
MAINTAINER Sam Hausmann

#install necessary packages
RUN apt-get -y update && apt-get install -y git && apt-get install -y vim && apt-get install -y curl

#install necesary npm packages
RUN npm install -g mocha

#set the working directory
WORKDIR /source

CMD /bin/bash

VOLUME ["/source"]
