#!/bin/bash

# create a folder for the .status files and move them
cd ../mock-data
mkdir status
mkdir other
cd response
find . -name "*.status" -exec mv {} ../status \;
find . -name "info.json" -exec mv {} ../other \;
find . -name "ping.json" -exec mv {} ../other \;
find . -name "checkVersion.json" -exec mv {} ../other \;
find . -name "retry-fail.json" -exec mv {} ../other \;
find . -name "bad_info.json" -exec mv {} ../other \;
cd ../../NodejsBinding/test/tests
mocha unittests.js