FROM node:4.2.6
MAINTAINER Sam Hausmann

#install necessary packages
RUN apt-get -y update && apt-get install -y git && apt-get install -y vim && apt-get install -y curl

#install necesary npm packages
RUN npm install -g mocha

#set the working directory
WORKDIR /source

# copy move files script
COPY moveFiles.sh /source/moveFiles.sh 
RUN chmod 755 /source/moveFiles.sh

CMD ./moveFiles.sh; /bin/bash

VOLUME ["/source"]

