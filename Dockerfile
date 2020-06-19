FROM openjdk:8-jdk

# Version Variables
ENV ANDROID_SDK_TOOLS 6514223
ENV ANDROID_COMPILE_SDK 29
ENV ANDROID_BUILD_TOOLS 29.0.3
ENV ANDROID_NDK 20.0.5594570
ENV ANDROID_HOME /android-sdk-linux/

# Update the Image and Install Dependencies
RUN apt-get --quiet --yes update && apt-get --quiet --yes install \
    unzip python3 python3-distutils libsodium-dev nodejs

# Download and Install Python Dependencies
RUN curl -o get-pip.py https://bootstrap.pypa.io/get-pip.py
RUN python3 get-pip.py && rm get-pip.py
RUN pip install nox coverage

# Download Android-SDK, Install Android-SDK's Dependencies and Accept Licenses
RUN curl -o android-sdk.zip \
    "https://dl.google.com/android/repository/commandlinetools-linux-${ANDROID_SDK_TOOLS}_latest.zip"
RUN unzip -d android-sdk-linux android-sdk.zip && rm android-sdk.zip
RUN yes | android-sdk-linux/tools/bin/sdkmanager --sdk_root=${ANDROID_HOME} \
    "platforms;android-${ANDROID_COMPILE_SDK}" "build-tools;${ANDROID_BUILD_TOOLS}" \
    "ndk;${ANDROID_NDK}" "platform-tools"
RUN yes | android-sdk-linux/tools/bin/sdkmanager --licenses --sdk_root=${ANDROID_HOME}

# Install Node, npm and Yarn
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - \
    && curl -L https://www.npmjs.com/install.sh | sh
RUN curl -o- -L https://yarnpkg.com/install.sh | bash

# Entry Command
CMD [ "/bin/bash" ]

# # Add Build Script
# COPY ./build-entrypoint.sh /build-entrypoint.sh
# RUN chmod +x /build-entrypoint.sh
# ENTRYPOINT ["/build-entrypoint.sh"]
