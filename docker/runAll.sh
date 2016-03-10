#!/bin/bash

#Gets called when the user doesn't provide any args
function HELP {
    echo -e "\nusage: source_file.py --key API_KEY [--url ALT_URL]"
    echo "  API_KEY       - Rosette API key (required)"
    echo "  FILENAME      - Python source file (optional)"
    echo "  ALT_URL       - Alternate service URL (optional)"
    echo "  GIT_USERNAME  - Git username where you would like to push regenerated gh-pages (optional)"
    echo "  VERSION       - Build version (optional)"
    echo "Compiles and runs the source file(s) using the local development source."
    exit 1
}

#Gets API_KEY, FILENAME and ALT_URL if present
while getopts ":API_KEY:FILENAME:ALT_URL:GIT_USERNAME:VERSION" arg; do
    case "${arg}" in
        API_KEY)
            API_KEY=${OPTARG}
            usage
            ;;
        ALT_URL)
            ALT_URL=${OPTARG}
            usage
            ;;
        FILENAME)
            FILENAME=${OPTARG}
            usage
            ;;
        GIT_USERNAME)
            GIT_USERNAME=${OPTARG}
            usage
            ;;
        VERSION)
            VERSION={OPTARG}
            usage
            ;;
    esac
done
ping_url="https://api.rosette.com/rest/v1/"

# add the trailing slash of the alt_url if necessary
if [ ! -z "${ALT_URL}" ]; then
    if [[ ! ${ALT_URL} == */ ]]; then
        ALT_URL="${ALT_URL}/"
        echo "No Slash detected"
    fi
    ping_url=${ALT_URL}
fi

#Checks for valid url
match=$(curl "${ping_url}ping" -H "X-RosetteAPI-Key: ${API_KEY}" |  grep -o "Rosette API")
if [ "${match}" = "" ]; then
    echo -e "\n${ping_url} server not responding\n"
    exit 1
fi  

#Checks if Rosette API key is valid
function checkAPI {
    match=$(curl "${ping_url}ping" -H "X-RosetteAPI-Key: ${API_KEY}" |  grep -o "forbidden")
    if [ ! -z $match ]; then
        echo -e "\nInvalid Rosette API Key"
        exit 1
    fi  
}

#Copy the mounted content in /source to current WORKDIR
cp -r -n /source/. .

#Run unit tests

cd mock-data
mkdir status
mkdir other
cd response
find . -name "*.status" -exec mv {} ../status \;
find . -name "info.json" -exec mv {} ../other \;
find . -name "ping.json" -exec mv {} ../other \;
find . -name "checkVersion.json" -exec mv {} ../other \;
find . -name "retry-fail.json" -exec mv {} ../other \;
find . -name "bad_info.json" -exec mv {} ../other \;

cd ../../tests
npm install -g mocha
npm install mocha
npm install -g istanbul
npm install chai
npm install nock
istanbul cover _mocha unittests.js

#Run the examples
if [ ! -z ${API_KEY} ]; then
    checkAPI
    #Prerequisite
    cd ../examples
    npm install argparse
    npm install temporary
    if [ ! -z ${FILENAME} ]; then
        if [ ! -z ${ALT_URL} ]; then
	    node ${FILENAME} --key ${API_KEY} --url ${ALT_URL} 
	else
	   node ${FILENAME} --key ${API_KEY} 
   	fi
    elif [ ! -z ${ALT_URL} ]; then
    	find . -name '*.js' -exec node {} --key ${API_KEY} --url ${ALT_URL} \;
    else
	find . -name '*.js' -exec node {} --key ${API_KEY} \;
    fi
else 
    HELP
fi

#run eslint
npm install -g eslint
eslint ../lib/**

#Generate gh-pages and push them to git account (if git username is provided)
if [ ! -z ${GIT_USERNAME} ] && [ ! -z ${VERSION} ]; then
   #clone nodejs git repo
   cd /
   git clone git@github.com:${GIT_USERNAME}/nodejs.git
   cd nodejs
   git checkout origin/gh-pages -b gh-pages
   git branch -d develop
   #generate gh-pages and set ouput dir to git repo (gh-pages branch)
   cd ../nodejs-dev
   npm install -g grunt-cli
   npm install grunt
   npm install
   grunt
   cd ../nodejs
   rm -rf node_modules
   git add .
   git commit -a -m "publish grunt apidocs ${VERSION}"
   git push
fi
