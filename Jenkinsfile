// Changing this list modifies which devices are going to be available in the emulator farm.
List android_versions = [
    '30;google_apis;x86', '29;google_apis;x86', '28;google_apis;x86_64',
    '27;google_apis;x86','26;google_apis;x86', '25;google_apis;x86',
    '24;google_apis;x86', '23;google_apis;x86', '22;google_apis;x86',
    '21;google_apis;x86'
]

// Building procedure. It also contains all static code checks and the python code-base's tests.
node {
    docker.build("android_environment:latest").inside("--user root") {
        // Creating for missing keystore file.
        stage('Keystore') {
          if (!fileExists('./android/app/debug.keystore')) {
                sh 'keytool -genkey -v -keystore ./android/app/debug.keystore \
                    -storepass android -alias androiddebugkey \
                    -dname "CN=Unknown, OU=Unknown, O=Unknown, L=Unknown, S=Unknown, C=Unknown" \
                    -keypass android -keyalg RSA -keysize 2048 -validity 10000'
            }
        }
        // Creating for missing properties file.
        stage('Properties') {
            if (!fileExists('./android/local.properties')) {
                sh 'echo "sdk.dir=/android/sdk" >> ./android/local.properties'
            }
        }
        // Building the application.
        stage('Build') {
            sh 'yarn install'
            sh 'cd android && ./gradlew :app:assemble'
        }
        // Runnign static analysis and tests against python's code-base.
        stage('Validate') {
            sh 'node_modules/eslint/bin/eslint.js ./components/** ./hooks/** \
                ./screens/** ./App.tsx ./index.js ./Store.tsx'
            sh 'cd android && ./gradlew :app:checkstyle :app:pmd :app:lint'
            sh 'cd android/app/src/main/python && nox && coverage html'
        }
    }
}

// This loop goes over every device from "android_versions" 
// and runs integration and system tests against them.
android_versions.each { android_version ->
    List version = android_version.split(';')
    // Setting the environmental variables for Docker.
    List dockerEnv = ['IMG_TARGET=' + version[0], 'IMG_SORT=' + version[1], 'IMG_CPU=' + version[2]]
    node {
        docker.image("android_environment:latest").inside("--user root --device /dev/kvm") {
            withEnv(dockerEnv) {
                stage ('Device Test - Version ' + version[0]) {
                    // Installing the system image.
                    sh 'yes | $ANDROID_SDK_ROOT/tools/bin/sdkmanager \
                        --sdk_root=$ANDROID_SDK_ROOT \
                        "system-images;android-${IMG_TARGET};${IMG_SORT};${IMG_CPU}"'
                    // Starting the emulator.
                    sh 'export IMG_SORT=${IMG_SORT} && export IMG_TARGET=${IMG_TARGET} \
                        && export IMG_ABI=${IMG_CPU} && export IMG_CPU=${IMG_CPU} \
                        && /android/sdk/launch-emulator.sh > /dev/null 2>&1 &'
                    // Waiting for the device to boot.
                    sh '/android/sdk/platform-tools/adb wait-for-device'
                    // Running the tests. There is a 10 minutes timeout, since sometimes the 
                    // emulator does not stop after a test failure. Also failures are allowed so
                    // that the pipeline can proceed and run the procedure agains all emulators.
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        timeout(time: 5, unit: 'MINUTES') {
                            sh 'cd android && ./gradlew :app:connectedDebugAndroidTest'
                        }
                    }
                }
            }
        }
    }
}
