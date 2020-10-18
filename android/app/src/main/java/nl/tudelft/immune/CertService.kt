package nl.tudelft.immune

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.os.Binder
import android.os.Build
import android.os.IBinder
import android.os.Process
import androidx.core.app.NotificationCompat
import com.chaquo.python.Python
import com.chaquo.python.android.AndroidPlatform

/**
 * Implementation of the service initializer.
 */
open class CertService : Service() {
    // The persistent foreground notification.
    @Transient
    var notification: Notification? = null
        private set

    // The custom notification channel needed in APIs 26+.
    @Transient
    var notificationChannel: NotificationChannel? = null
        private set

    // The binder that provides connection with the service to clients.
    @Transient
    private val certBinder: IBinder = CertBinder()

    /**
     * Destruction method. Gets called whenever the gui tries to unbind from the service or
     * the last existing widget gets deleted. Responsible for using the Chaquopy's bridge for
     * stopping the service, removing the persistent notification from the foreground,
     * deleting the custom notification channel and stopping the foreground service.
     */
    override fun onDestroy() {
        stopService()
        super.onDestroy()
    }

    /**
     * Start method. Gets called whenever the widget creates a new instance of the service.
     * Responsible for starting the service.
     * @return Flag indicating that the service should not be restarted if it was previously stopped.
     */
    override fun onStartCommand(intent: Intent, flags: Int, startId: Int): Int {
        startService()
        return START_NOT_STICKY
    }

    /**
     * Start method. Gets called whenever the gui creates a new instance of the service.
     * Responsible for starting the service.
     *
     * @return The binder which provides access of the service object to clients.
     */
    override fun onBind(intent: Intent): IBinder? {
        return certBinder
    }

    /**
     * Helper method. Gets called when the service is being started.
     * Responsible for starting the python service through Chaquopy's bridge.
     */
    fun startService() {
        if (!running) {
            if (!Python.isStarted()) {
                Python.start(AndroidPlatform(this))
            }
            Python.getInstance().getModule("certificate_service").callAttr("start")
            createNotificationChannel()
            createNotification()
            startForeground(Process.myPid(), notification)
            running = true
        }
    }

    /**
     * Helper method. Gets called when the service is being stopped.
     * Responsible for stopping the python service through Chaquopy's bridge,
     * removing the notification channel created
     * and removing the foreground service notification.
     */
    fun stopService() {
        if (running) {
            Python.getInstance().getModule("certificate_service").callAttr("stop")
            Python.getInstance().getModule("certificate_service").close()
            deleteNotificationChannel()
            stopForeground(false)
            running = false
        }
    }

    /**
     * Helper method. Creates the persistent notification needed
     * when the service is running in the foreground.
     */
    private fun createNotification() {
        notification = NotificationCompat.Builder(this, CHANNEL_ID)
                .setSmallIcon(R.drawable.ic_launcher_foreground)
                .setTicker(getText(R.string.foreground_service_text))
                .setContentTitle(getText(R.string.foreground_service_description))
                .setContentText(getText(R.string.foreground_service_text))
                .setPriority(NotificationCompat.PRIORITY_LOW)
                .build()
    }

    /**
     * Helper method. Gets called when the service is being started.
     * Responsible for creating the notification channel.
     */
    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val name: CharSequence = getString(R.string.foreground_channel_text)
            val description = getString(R.string.foreground_channel_description)
            val importance = NotificationManager.IMPORTANCE_LOW
            notificationChannel = NotificationChannel(CHANNEL_ID, name, importance)
            notificationChannel!!.description = description
            val notificationManager = getSystemService(NotificationManager::class.java)!!
            notificationManager.createNotificationChannel(notificationChannel!!)
        }
    }

    /**
     * Helper method. Gets called when the service is being stopped.
     * Responsible for deleting the notification channel.
     */
    private fun deleteNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val notificationManager = getSystemService(NotificationManager::class.java)!!
            notificationManager.deleteNotificationChannel(CHANNEL_ID)
        }
    }

    /*
    * Binder class that provides service control methods
    * to all clients which bind to the service.
    */
    inner class CertBinder : Binder() {
        val service: CertService
            get() = this@CertService
    }

    companion object {
        // Information about the service's state. Prevents from starting
        // or stopping the service more than once.
        var running = false
            private set

        // The identifier of the custom channel needed in APIs 26+.
        private const val CHANNEL_ID = "Certification Service Channel"
    }
}