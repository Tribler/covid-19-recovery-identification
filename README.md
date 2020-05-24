# Immunity Passports
## Building a Critical Infrastructure for the Nation-Wide Identification of Recovered COVID-19 Patients

### Running:
1. Install all dependencies by running in a terminal:
    ```
    yarn
    ```

2. Build the service and bundle it with the main application:
    Run the Gradle Task buildServiceApk in /android/service/build.gradle in order to build the service and add it as a resource of the main application.
    
    NOTE: This does not support debuging! In order to debug the service, run the service application separately.

    NOTE: After installing the service in Android, restart the application and do not install the service anymore!

3. To start the application, run the following command in a terminal: 
    ```
    npx react-native start
    ```
    and the following one in another terminal:
    ```
    npx react-native run-android
    ```

4. To close the app, stop execution on the consoles used in Step 2.

### If experiencing the following error:
```
TypeError: undefined is not an object (evaluating '_reactNative.Animated.Text.propTypes.style')
```
###  this is a fix:
1. In node_modules\react-native-material-textfield\src\label\index.js comment out the line:
```
style: Animated.Text.propTypes.style (probably line 32)
```

2. In node_modules\react-native-material-textfield\src\affix\index.js comment out the line:
```
style: Animated.Text.propTypes.style, (probably line 27)
```

3. In node_modules\react-native-material-textfield\src\helper\index.js comment out the line:
```
style: Animated.Text.propTypes.style (probably line 13)
```

### If missing keystore.debug this is a fix:
Run the following command in a terminal, that has /android/app opened:
```
keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
```
