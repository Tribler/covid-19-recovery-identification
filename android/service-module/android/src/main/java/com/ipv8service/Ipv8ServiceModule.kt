package com.ipv8service

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class Ipv8ServiceModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "Ipv8Service"
  }

  // Example method
  // See https://facebook.github.io/react-native/docs/native-modules-android
  @ReactMethod
  fun multiply(a: Int, b: Int, promise: Promise) {
    promise.resolve(a * b)
  }


}
