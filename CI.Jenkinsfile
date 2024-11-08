node ("docker-light") {
    def sourceDir = pwd()
    def nodeVersions = ["18", "20", "22", "23"]
    try {
        stage("Clean up") {
            step([$class: 'WsCleanup'])
        }
        stage("Checkout Code") {
            checkout scm
        }
        stage("Build And Test") {

            withSonarQubeEnv {
                mySonarOpts="-Dsonar.login=${env.SONAR_AUTH_TOKEN} -Dsonar.host.url=${env.SONAR_HOST_URL} -D"
                if("${env.CHANGE_ID}" != "null"){
                        mySonarOpts = "$mySonarOpts -Dsonar.pullrequest.key=${env.CHANGE_ID} -Dsonar.pullrequest.branch=${env.BRANCH_NAME}"
                } else {
                    mySonarOpts = "$mySonarOpts -Dsonar.branch.name=${env.BRANCH_NAME}"
                }
                if ("${env.CHANGE_BRANCH}" != "null") {
                    mySonarOpts="$mySonarOpts -Dsonar.pullrequest.base=${env.CHANGE_TARGET} -Dsonar.pullrequest.branch=${env.CHANGE_BRANCH}"
                }

                nodeVersions.each { version ->
                    if (version == "23") {
                        sonarExec="cd /root/ && \
                                       wget -q https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.8.1.3023-linux.zip && \
                                       unzip -q sonar-scanner-cli-4.8.1.3023-linux.zip && \
                                       cd /source && \
                                       /root/sonar-scanner-4.8.1.3023-linux/bin/sonar-scanner ${mySonarOpts}"
                    } else {
                        sonarExec="echo Skipping Sonar for this version."
                    }

                    sh "docker run --rm \
                            --pull always \
                            --volume ${sourceDir}:/source \
                            node:${version} \
                            sh -c \"cd /source && npm install && npx grunt && ${sonarExec} && chown -R 9960:9960 /source\""
                }
            }
        }
    }
    catch (e) {
        currentBuild.result = "FAILED"
        throw e
    }
}
// todo post to teams