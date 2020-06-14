#!/bin/bash
set -eu
export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"

cd android

if [ ! -f app/debug.keystore ] && [ ! -f local.properties ]; then
  keytool -genkey -v -keystore app/debug.keystore -storepass android \
    -alias androiddebugkey -dname "CN=Unknown, OU=Unknown, O=Unknown, L=Unknown, S=Unknown, C=Unknown" \
    -keypass android -keyalg RSA -keysize 2048 -validity 10000
  echo "sdk.dir=${ANDROID_HOME}" >>local.properties
fi

if [ ! -f local.properties ]; then
  echo "sdk.dir=${ANDROID_HOME}" >>local.properties
fi

case "${1}" in
"build")
  yarn install
  ./gradlew :app:assemble
  ;;
"checkstyle")
  yarn install
  ./gradlew :app:checkstyle
  ;;
"pmd")
  yarn install
  ./gradlew :app:pmd
  ;;
"java_test")
  yarn install
  ./gradlew :app:connectedCheck
  ;;
"python_test")
  cd app/src/main/python && nox && coverage html
  ;;
"typescript_eslint")
  cd .. && npx eslint -o android/app/build/reports/eslint.html -f html ./components/** ./hooks/** ./network/** ./screens/** ./App.tsx ./index.js ./Store.tsx
  ;;
esac
