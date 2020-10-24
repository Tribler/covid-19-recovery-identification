# ipv8-service

Integration of the IPv8 Service with Android, IOS and Web.

## Usage

```js
import Ipv8Service from "ipv8-service";

// ...

Ipv8Service.initService();
```

# Immune - !!!NEEDS TO BE REDACTED
## Building a Critical Infrastructure for the Nation-Wide Identification of Recovered COVID-19 Patients

This app is a Self Sovereign Identity document exchange platform, which uses the IPv8 backend provided by the TU Delft Blockchain Lab to allow professionals to create certificates for an individual's online identity. The individual can then send and proof the validity of this certificate to a third party, while preserving the individual's privacy and control over their data.

### Running:
1. Install all dependencies and patches by running in a terminal:
    ```
    yarn
    ```

2. To start the application, run the following command in a terminal: 
    ```
    npx react-native start
    ```
    and the following in another terminal:
    ```
    npx react-native run-android
    ```

3. To close the app, stop execution on the terminals used in Step 2.

### If missing keystore.debug this is a fix:
Run the following command in a terminal, that has /android/app opened:
```
keytool -genkey -v -keystore android/app/debug.keystore -storepass android -alias androiddebugkey -dname "CN=Unknown, OU=Unknown, O=Unknown, L=Unknown, S=Unknown, C=Unknown" -keypass android -keyalg RSA -keysize 2048 -validity 10000
```

Alternatively: The keytool.exe is in the Java JRE folder, you can run the command there and then move the debug.keystore file into ./android/app

## License

LGPL-3.0

### Output from yarn bootstrap
warning commitlint > @commitlint/cli > babel-polyfill > core-js@2.6.11: core-js@<3 is no longer maintained and not recommended for usage due to the number of issues. Please, upgrade your dependencies to the actual version of core-js@3.
warning commitlint > @commitlint/cli > babel-polyfill > babel-runtime > core-js@2.6.11: core-js@<3 is no longer maintained and not recommended for usage due to the number of issues. Please, upgrade your dependencies to the actual version of core-js@3.
warning jest > jest-cli > jest-config > jest-environment-jsdom > jsdom > request-promise-native@1.0.9: request-promise-native has been deprecated because it extends the now deprecated request package, see https://github.com/request/request/issues/3142
warning jest > jest-cli > jest-config > jest-environment-jsdom > jsdom > request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
warning jest > jest-cli > jest-config > jest-environment-jsdom > jsdom > request > har-validator@5.1.5: this library is no longer supported
warning jest > @jest/core > jest-haste-map > sane > micromatch > snapdragon > source-map-resolve > resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
warning jest > @jest/core > jest-haste-map > sane > micromatch > snapdragon > source-map-resolve > urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
warning react-native > fbjs-scripts > core-js@2.6.11: core-js@<3 is no longer maintained and not recommended for usage due to the number of issues. Please, upgrade your dependencies to the actual version of core-js@3.
warning react-native > fbjs > core-js@2.6.11: core-js@<3 is no longer maintained and not recommended for usage due to the number of issues. Please, upgrade your dependencies to the actual version of core-js@3.
warning react-native > metro-babel-register > core-js@2.6.11: core-js@<3 is no longer maintained and not recommended for usage due to the number of issues. Please, upgrade your dependencies to the actual version of core-js@3.
warning react-native > @react-native-community/cli > @hapi/joi@15.1.1: joi is leaving the @hapi organization and moving back to 'joi' (https://github.com/sideway/joi/issues/2411)
warning react-native > @react-native-community/cli > metro > jest-haste-map > fsevents@1.2.13: fsevents 1 will break on node v14+ and could be using insecure binaries. Upgrade to fsevents 2.
warning react-native > @react-native-community/cli > @hapi/joi > @hapi/address@2.1.4: This version has been deprecated and is no longer supported or maintained
warning react-native > @react-native-community/cli > @hapi/joi > @hapi/hoek@8.5.1: This version has been deprecated and is no longer supported or maintained
warning react-native > @react-native-community/cli > @hapi/joi > @hapi/topo@3.1.6: This version has been deprecated and is no longer supported or maintained
warning react-native > @react-native-community/cli > @hapi/joi > @hapi/topo > @hapi/hoek@8.5.1: This version has been deprecated and is no longer supported or maintained
warning react-native > @react-native-community/cli > @hapi/joi > @hapi/bourne@1.3.2: This version has been deprecated and is no longer supported or maintained
