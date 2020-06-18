FROM docker

# Version Variables
ARG GLIBC_VERSION="2.31-r0"
ENV ANDROID_SDK_TOOLS 6514223
ENV ANDROID_COMPILE_SDK 30
ENV ANDROID_BUILD_TOOLS 30.0.0
ENV ANDROID_NDK 21.0.6113669
ENV ANDROID_HOME /android-sdk-linux/

# Update the Image and Install Dependencies
RUN apk -U update && apk -U add libvirt-daemon qemu-img qemu-system-x86_64 \
    unzip git wget openrc python3 openjdk8 libsodium-dev npm nodejs yarn \
    bash ca-certificates expect fontconfig make libstdc++ libgcc mesa-dev \
    pulseaudio-dev su-exec ncurses zlib
RUN wget -O /etc/apk/keys/sgerrand.rsa.pub \
    https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub
RUN wget -O /tmp/glibc.apk \
    https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-${GLIBC_VERSION}.apk
RUN wget -O /tmp/glibc-bin.apk \
    https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-bin-${GLIBC_VERSION}.apk
RUN apk add /tmp/glibc.apk /tmp/glibc-bin.apk \
    && rm -rf /tmp/* && rm -rf /var/cache/apk/*

RUN rc-update add libvirtd

# Download and Install Python Dependencies
RUN wget -O get-pip.py https://bootstrap.pypa.io/get-pip.py
RUN python3 get-pip.py && rm get-pip.py
RUN pip install nox coverage

# Download Android-SDK, Install Android-SDK's Dependencies and Accept Licenses
RUN wget -O android-sdk.zip \
    https://dl.google.com/android/repository/commandlinetools-linux-${ANDROID_SDK_TOOLS}_latest.zip
RUN unzip -d android-sdk-linux android-sdk.zip && rm android-sdk.zip
RUN yes | android-sdk-linux/tools/bin/sdkmanager --sdk_root=${ANDROID_HOME} "platforms;android-${ANDROID_COMPILE_SDK}" 
RUN yes | android-sdk-linux/tools/bin/sdkmanager --sdk_root=${ANDROID_HOME} "build-tools;${ANDROID_BUILD_TOOLS}" 
RUN yes | android-sdk-linux/tools/bin/sdkmanager --sdk_root=${ANDROID_HOME}  "ndk;${ANDROID_NDK}"
RUN yes | android-sdk-linux/tools/bin/sdkmanager --sdk_root=${ANDROID_HOME} "platform-tools"
RUN yes | android-sdk-linux/tools/bin/sdkmanager --sdk_root=${ANDROID_HOME} "emulator"
RUN yes | android-sdk-linux/tools/bin/sdkmanager --licenses --sdk_root=${ANDROID_HOME}
