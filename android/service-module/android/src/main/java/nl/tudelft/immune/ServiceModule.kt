package nl.tudelft.immune

import android.content.Intent
import android.os.Build
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.LifecycleEventListener

class ServiceModule(
  reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  // Information about the service's state.
  // Prevents from unwanted unbinding.
  @Transient
  private var shouldUnbind = false

  private val lifecycleEventListener: LifecycleEventListener = object : LifecycleEventListener {
    override fun onHostResume() {
      if (!shouldUnbind) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
          reactApplicationContext.startForegroundService(
            Intent(reactApplicationContext, CertService::class.java))
        } else {
          reactApplicationContext.startService(
            Intent(reactApplicationContext, CertService::class.java))
        }
        shouldUnbind = true
      }
    }

    override fun onHostDestroy() {
      if (shouldUnbind) {
        reactApplicationContext.stopService(
          Intent(reactApplicationContext, CertService::class.java))
        shouldUnbind = false
      }
    }

    override fun onHostPause() {}
  }

  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  override fun getName(): String {
    return "ServiceModule"
  }

  @ReactMethod
  private fun initService() {
    reactApplicationContext.addLifecycleEventListener(lifecycleEventListener)
  }
}
