package nl.tudelft.immune

import android.content.ComponentName
import android.content.Intent
import android.content.ServiceConnection
import android.os.Bundle
import android.os.IBinder
import com.facebook.react.ReactActivity
import nl.tudelft.immune.CertService.CertBinder

class MainActivity : ReactActivity() {
    // Information about the service's state.
    // Prevents from unwanted unbinding.
    @Transient
    private var shouldUnbind = false

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    override fun getMainComponentName(): String? {
        return "Immune"
    }

    /**
     * Creation method. Gets called when the gui gets started.
     * Responsible for binding to the service from the start.
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        bindService()
    }

    /**
     * Destruction method. Gets called when the gui is being closed.
     * Responsible for unbinding from the service at the end of the app's lifecycle.
     */
    override fun onDestroy() {
        super.onDestroy()
        unbindService()
    }

    /**
     * Helper method. Attempts to establish a connection with the service.
     */
    private fun bindService() {
        if (!shouldUnbind) {
            bindService(Intent(this, CertService::class.java),
                    connection, BIND_AUTO_CREATE)
            shouldUnbind = true
        }
    }

    /**
     * Helper method. Releases information about the service's state.
     */
    private fun unbindService() {
        if (shouldUnbind) {
            unbindService(connection)
            shouldUnbind = false
        }
    }

    // This object is responsible for the connection with the service
    // and its initialization.
    @Transient
    private val connection: ServiceConnection = object : ServiceConnection {
        /**
         * This is called when the connection with the service has been established,
         * giving us the service object we can use to interact with the service.
         */
        override fun onServiceConnected(className: ComponentName, service: IBinder) {
            val binder = service as CertBinder
            binder.service.startService()
        }

        /**
         * This is called when the connection with the service has been
         * unexpectedly disconnected -- that is, its process crashed.
         */
        override fun onServiceDisconnected(className: ComponentName) {}
    }
}