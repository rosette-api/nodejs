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
            nodeVersions.each { version ->
              sh "docker run --rm \
                    --pull always \
                    --volume ${sourceDir}:/source \
                    node:${version}-alpine \
                    sh -c \"cd /source && npm install -g npm && npm install grunt-cli -g && npx grunt\""
            }
        }
    }
    catch (e) {
        currentBuild.result = "FAILED"
        throw e
    }
}