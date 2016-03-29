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
    echo "Runs the examples using the NPM package."
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
    match=$(curl "${ping_url}ping" -H "X-RosetteAPI-Key: ${API_KEY}" -H "user_key: ${API_KEY}" |  grep -o "Rosette API")
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
while getopts ":API_KEY:FILENAME:ALT_URL" arg; do
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
    esac
done

cleanURL

validateURL

#Copy the mounted content in /source to current WORKDIR
cp -r -n /source/. .

#Run the examples
if [ ! -z ${API_KEY} ]; then
    checkAPI
    #Prerequisite
    cd ./examples
    npm install argparse
    npm install temporary
    npm install multipart-stream
    if [ ! -z ${FILENAME} ]; then
        runExample ${FILENAME}
    else
        for file in *.js; do
            runExample ${file}
        done
    fi
else 
    HELP
fi

exit ${retcode}
