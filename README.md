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
