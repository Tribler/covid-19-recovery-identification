package com.immune;

import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

// TODO Remove from Cache?

/**
 * Implementation of the widget's behavior.
 */
public class CertWidget extends AppWidgetProvider {

    /**
     * Setup method. Gets called with the creation of the first widget.
     * Responsible for starting the foreground service.
     *
     * @param context The main application's context.
     */
    @Override
    public void onEnabled(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
            context.startForegroundService(new Intent(context, CertService.class));
        else
            context.startService(new Intent(context, CertService.class));
    }

    /**
     * Setup method. Gets called with the deletion of the last widget.
     * Responsible for stopping the foreground service.
     *
     * @param context The main application's context.
     */
    @Override
    public void onDisabled(Context context) {
        context.stopService(new Intent(context, CertService.class));
    }
}

