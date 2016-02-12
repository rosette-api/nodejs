FROM node:4.2.6
MAINTAINER Sam Hausmann

#install necessary packages
RUN apt-get -y update && apt-get install -y git && apt-get install -y vim && apt-get install -y curl

#install necesary npm packages
RUN npm install -g mocha

#move mock data files

#set the working directory
WORKDIR /source/NodejsBinding

# copy move files script
COPY moveFiles.sh /source/NodejsBinding/moveFiles.sh 
RUN chmod 755 /source/NodejsBinding/moveFiles.sh

CMD ./moveFiles.sh; /bin/bash

VOLUME ["/source"]

