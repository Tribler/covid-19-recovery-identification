package com.immune;

import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

/**
 * Implementation of App Widget functionality.
 */
public class CertWidget extends AppWidgetProvider {

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
            context.startForegroundService(new Intent(context, CertService.class));
        else
            context.startService(new Intent(context, CertService.class));
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
        context.stopService(new Intent(context, CertService.class));
    }
}

