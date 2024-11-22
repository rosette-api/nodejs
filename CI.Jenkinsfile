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
                mySonarOpts="-Dsonar.login=${env.SONAR_AUTH_TOKEN} -Dsonar.host.url=${env.SONAR_HOST_URL}"
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
                        sonarScannerVersion="6.2.1.4610-linux-x64"
                        sonarExec="cd /root/ && \
                                   wget -q https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-${sonarScannerVersion}.zip && \
                                   unzip -q sonar-scanner-cli-${sonarScannerVersion}.zip && \
                                   cd /source && \
                                   /root/sonar-scanner-${sonarScannerVersion}/bin/sonar-scanner ${mySonarOpts}"
                    } else {
                        sonarExec="echo Skipping Sonar for this version."
                    }

                    sh "docker run --rm \
                            --pull always \
                            --volume ${sourceDir}:/source \
                            node:${version} \
                            sh -c \"cd /source && \
                                    npm install && \
                                    npx grunt && \
                                    ${sonarExec} && \
                                    chown -R 9960:9960 /source\""
                }
            }
        }
        postToTeams(true)
    } catch (e) {
        currentBuild.result = "FAILED"
        postToTeams(false)
        throw e
    }
}

def postToTeams(boolean success) {
    def webhookUrl = "${env.TEAMS_PNC_JENKINS_WEBHOOK_URL}"
    def color = success ? "#00FF00" : "#FF0000"
    def status = success ? "SUCCESSFUL" : "FAILED"
    def message = "*" + status + ":* '${env.JOB_NAME}' - [${env.BUILD_NUMBER}] - ${env.BUILD_URL}"
    office365ConnectorSend(webhookUrl: webhookUrl, color: color, message: message, status: status)
}
