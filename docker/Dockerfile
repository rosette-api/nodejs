FROM node:4.2.6
MAINTAINER Sam Hausmann

#install necessary packages
RUN apt-get -y update && apt-get install -y git && apt-get install -y vim && apt-get install -y curl

ENV API_KEY api_key

COPY runAll.sh /nodejs-dev/runAll.sh
RUN chmod 755 /nodejs-dev/runAll.sh

#set the working directory
WORKDIR /nodejs-dev

CMD ./runAll.sh $API_KEY $FILENAME $ALT_URL $GIT_USERNAME $VERSION

VOLUME ["/source"]
