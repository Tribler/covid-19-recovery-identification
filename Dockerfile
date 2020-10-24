FROM openjdk:8-jdk

# Version Variables
ENV ANDROID_SDK_TOOLS 6609375
ENV ANDROID_COMPILE_SDK 30
ENV ANDROID_BUILD_TOOLS 30.0.2
ENV ANDROID_NDK 21.0.6113669

# Environment Variables
ENV ANDROID_SDK_ROOT /android/sdk
ENV ANDROID_AVD_HOME /root/.android/avd

# Upgrade the Image and Install Dependencies
RUN apt-get --quiet --yes update && apt-get --quiet --yes full-upgrade \
    && apt-get --quiet --yes install --no-install-recommends unzip python3-distutils \
    python3 libsodium-dev libgl1 && apt-get --quiet --yes autoremove \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Download and Install Python Dependencies
RUN curl -o get-pip.py https://bootstrap.pypa.io/get-pip.py
RUN python3 get-pip.py && rm get-pip.py
RUN pip install nox coverage

# Install Node, npm and Yarn
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y nodejs
RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" \
    | tee /etc/apt/sources.list.d/yarn.list && apt-get update && apt-get install yarn

# Download Android-SDK, Install Android-SDK's Dependencies and Accept Licenses
RUN curl -o android-sdk.zip \
"https://dl.google.com/android/repository/commandlinetools-linux-${ANDROID_SDK_TOOLS}_latest.zip"
RUN mkdir /android && unzip -d ${ANDROID_SDK_ROOT} android-sdk.zip && rm android-sdk.zip
RUN yes | ${ANDROID_SDK_ROOT}/tools/bin/sdkmanager --sdk_root=${ANDROID_SDK_ROOT} \
    "platforms;android-${ANDROID_COMPILE_SDK}" "build-tools;${ANDROID_BUILD_TOOLS}" \
    "ndk;${ANDROID_NDK}" "platform-tools" "emulator"
RUN yes | ${ANDROID_SDK_ROOT}/tools/bin/sdkmanager --licenses --sdk_root=${ANDROID_SDK_ROOT}

# Adding the Emulator's Configuration Files and Configuring Permissions
COPY config/config.ini ${ANDROID_AVD_HOME}/Device.avd/
COPY config/Device.ini ${ANDROID_AVD_HOME}/
COPY config/launch-emulator.sh ${ANDROID_SDK_ROOT}/
RUN chmod +x ${ANDROID_SDK_ROOT}/launch-emulator.sh ${ANDROID_SDK_ROOT}/platform-tools/adb

# Entry Command
CMD [ "/bin/bash" ]
