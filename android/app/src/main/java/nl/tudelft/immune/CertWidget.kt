package nl.tudelft.immune

import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.Intent
import android.os.Build

/**
 * Implementation of the widget's behavior.
 */
class CertWidget : AppWidgetProvider() {
    /**
     * Setup method. Gets called with the creation of the first widget.
     * Responsible for starting the foreground service.
     *
     * @param context The main application's context.
     */
    override fun onEnabled(context: Context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            context.startForegroundService(Intent(context, CertService::class.java))
        } else {
            context.startService(Intent(context, CertService::class.java))
        }
    }

    /**
     * Setup method. Gets called with the deletion of the last widget.
     * Responsible for stopping the foreground service.
     *
     * @param context The main application's context.
     */
    override fun onDisabled(context: Context) {
        context.stopService(Intent(context, CertService::class.java))
    }
}