#!/bin/sh

# Delete any leftovers from hard exits.
clean_up() {
  rm -rf /tmp/*
  rm -rf $ANDROID_AVD_HOME/Device.avd/*.lock
  mkdir -p /root/.android
}

# Initialize loggers
forward_loggers() {
  mkdir /tmp/android-unknown
  mkfifo /tmp/android-unknown/kernel.log
  mkfifo /tmp/android-unknown/logcat.log
  echo "emulator: It is safe to ignore the warnings from tail."
  tail --retry -f /tmp/android-unknown/goldfish_rtc_0 | sed -u 's/^/video: /g' &
  cat /tmp/android-unknown/kernel.log | sed -u 's/^/kernel: /g' &
  cat /tmp/android-unknown/logcat.log | sed -u 's/^/logcat: /g' &
}

# Write the correct parameters for every emulator to their config files.
config_parameters() {
  sed -i -e 's@$IMG_SORT@'$IMG_SORT'@' \
    -e 's@$IMG_ABI@'$IMG_ABI'@' \
    -e 's@$IMG_CPU@'$IMG_CPU'@' \
    -e 's@$IMG_TARGET@'$IMG_TARGET'@' \
    $ANDROID_AVD_HOME/Device.avd/config.ini
  sed -i -e 's@$IMG_TARGET@'$IMG_TARGET'@' \
    -e 's@$ANDROID_AVD_HOME@'$ANDROID_AVD_HOME'@' \
    $ANDROID_AVD_HOME/Device.ini
}

clean_up
forward_loggers
config_parameters

# Launcher command.
$ANDROID_SDK_ROOT/emulator/emulator -avd Device -verbose \
  -no-window -no-audio -skip-adb-auth -no-snapshot -wipe-data
-shell-serial file:/tmp/android-unknown/kernel.log
-logcat-output /tmp/android-unknown/logcat.log
-feature AllowSnapshotMigration -qemu -append panic=1
-gpu swiftshader_indirect
