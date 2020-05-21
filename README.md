# Immunity Passports
## Building a Critical Infrastructure for the Nation-Wide Identification of Recovered COVID-19 Patients

### Running:
1. Install all dependencies by running in a terminal:
    ```
    yarn
    ```

2. To start the application, run the following command in a terminal: 
    ```
    npx react-native start
    ```
    and the following one in another terminal:
    ```
    npx react-native 
    ```

3. To close the app, stop execution on the consoles used in Step 2.

If experiencing the error TypeError: undefined is not an object (evaluating '_reactNative.Animated.Text.propTypes.style') this is a fix:

In node_modules\react-native-material-textfield\src\label\index.js comment out the line "style: Animated.Text.propTypes.style" (probably line 32)
In node_modules\react-native-material-textfield\src\affix\index.js comment out the line "style: Animated.Text.propTypes.style," (probably line 27)
In node_modules\react-native-material-textfield\src\helper\index.js comment out the line "style: Animated.Text.propTypes.style" (probably line 13)
