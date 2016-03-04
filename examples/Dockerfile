FROM node:4.2.6
MAINTAINER Sam Hausmann

#install necessary packages
RUN apt-get -y update && apt-get install -y git && apt-get install -y vim && apt-get install -y curl

ENV API_KEY api_key

#set the working directory
WORKDIR /source/examples

CMD chmod 0755 ./runAll.sh && ./runAll.sh $API_KEY $FILENAME $ALT_URL; /bin/bash

VOLUME ["/source"]
