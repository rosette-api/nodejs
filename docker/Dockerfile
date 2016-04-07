FROM node:4.2.6
MAINTAINER Sam Hausmann

#install necessary packages
RUN apt-get -y update && apt-get install -y git && apt-get install -y vim && apt-get install -y curl

ENV API_KEY api_key

RUN mkdir /nodejs-dev
COPY runAll.sh /nodejs-dev/runAll.sh
RUN chmod 0755 /nodejs-dev/runAll.sh

#set the working directory
WORKDIR /nodejs-dev

CMD ./runAll.sh $API_KEY $FILENAME $ALT_URL $GIT_USERNAME $GIT_EMAIL $VERSION
VOLUME ["/source"]
