FROM node:4.2.6
MAINTAINER Sam Hausmann

#install necessary packages
RUN apt-get -y update && apt-get install -y git && apt-get install -y vim && apt-get install -y curl

ENV API_KEY api_key

#set the working directory
RUN mkdir /nodejs-dev
WORKDIR /nodejs-dev
COPY runAll.sh runAll.sh
RUN chmod 0755 runAll.sh

CMD ./runAll.sh $API_KEY $FILENAME $ALT_URL

VOLUME ["/source"]

