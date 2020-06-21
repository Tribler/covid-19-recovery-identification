# Immunity Passports
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

Alternatively: The keytool.exe is in the Java JRE folder, you can run the command there and then move the debug.keystore file into /android/app
    