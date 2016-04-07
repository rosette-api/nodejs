#!/bin/bash

ping_url="https://api.rosette.com/rest/v1/"
retcode=0

#------------------- Functions -------------------------------------

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

#Checks if Rosette API key is valid
function checkAPI() {
    match=$(curl "${ping_url}ping" -H "X-RosetteAPI-Key: ${API_KEY}" |  grep -o "forbidden")
    if [ ! -z $match ]; then
        echo -e "\nInvalid Rosette API Key"
        exit 1
    fi  
}

# add the trailing slash of the alt_url if necessary
function cleanURL() {
    if [ ! -z "${ALT_URL}" ]; then
        if [[ ! ${ALT_URL} == */ ]]; then
            ALT_URL="${ALT_URL}/"
            echo "No Slash detected"
        fi
        ping_url=${ALT_URL}
    fi
}

#Checks for valid url
function validateURL() {
    match=$(curl "${ping_url}ping" -H "X-RosetteAPI-Key: ${API_KEY}" |  grep -o "Rosette API")
    if [ "${match}" = "" ]; then
        echo -e "\n${ping_url} server not responding\n"
        exit 1
    fi  
}

function runExample() {
    echo -e "\n---------- ${1} start -------------"
    result=""
    if [ -z ${ALT_URL} ]; then
        result="$(node ${1} --key ${API_KEY} 2>&1 )"
    else
        result="$(node ${1} --key ${API_KEY} --url ${ALT_URL} 2>&1 )"
    fi
    echo "${result}"
    echo -e "\n---------- ${1} end -------------"
    if [[ $result == *"Exception"* ]]; then
        retcode=1
    elif [[ $result == *"processingFailure"* ]]; then
        retcode=1
    fi
}


#------------------- Functions End ----------------------------------

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

cleanURL

validateURL

#Copy the mounted content in /source to current WORKDIR
cp -r -n /source/. .

#Run unit tests
npm install -g grunt-cli
npm install -g eslint
npm install
grunt test
#run eslint
eslint lib/*.js



#Run the examples
if [ ! -z ${API_KEY} ]; then
    checkAPI
    #Prerequisite
    cd examples
    npm install argparse
    npm install temporary
    if [ ! -z ${FILENAME} ]; then
        runExample ${FILENAME}
    else
        for file in *.js; do
            runExample $file
        done
    fi
else 
    HELP
    retcode=1
fi

#Generate gh-pages and push them to git account (if git username is provided)
if [ ! -z ${GIT_USERNAME} ]; then

grunt doc
fi

exit ${retcode}

