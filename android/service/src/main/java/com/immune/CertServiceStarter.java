package com.immune;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import java.util.ArrayList;
import java.util.Arrays;

public class CertServiceStarter extends BroadcastReceiver {

    private static final ArrayList<String> intentStart = new ArrayList<>(Arrays.asList(
            Intent.ACTION_BOOT_COMPLETED, "com.immune.android.START_SERVICE"));
    private static final ArrayList<String> intentStop = new ArrayList<>(Arrays.asList(
            Intent.ACTION_SHUTDOWN, "com.immune.android.STOP_SERVICE"));

    @Override
    public void onReceive(Context context, Intent intent) {
        Intent intentService = new Intent(context, CertService.class);
        if (intentStart.contains(intent.getAction())) {
//            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
//                context.startForegroundService(intentService);
//            else
            context.startService(intentService);
        } else if (intentStop.contains(intent.getAction())) {
            context.stopService(intentService);
        }
    }
}
