package com.immune;

import android.app.Notification;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;

import com.chaquo.python.Python;
import com.chaquo.python.android.AndroidPlatform;

public class CertService extends Service {

    private Boolean running = false;

    /**
     * Class for clients to access.  Because we know this service always
     * runs in the same process as its clients, we don't need to deal with
     * IPC.
     */
    class CertBinder extends Binder {
        CertService getService() {
            return CertService.this;
        }
    }

    @Override
    public void onCreate() {
        // Display a notification about us starting.  We put an icon in the status bar.
        if (!Python.isStarted()) {
            Python.start(new AndroidPlatform(this));
        }
    }

    @Override
    public void onDestroy() {
        // Cancel the persistent notification.
        if(running){
            Python.getInstance().getModule("cert_service").callAttr("stop");
            running = false;
        }
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.i("CertService", "Received start id " + startId + ": " + intent);
        showNotification();
        if(!running){
            Python.getInstance().getModule("cert_service").callAttr("start");
            running = true;
        }
        return START_REDELIVER_INTENT; // TODO CHECK IF THIS GETS HIT.
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        if (!Python.isStarted()) {
            Python.start(new AndroidPlatform(this));
        }
        if(!running){ // TODO CHECK WHY BINDING DOES NOT START THE SERVICE AND TEST ACROSS VERSIONS.
            Python.getInstance().getModule("cert_service").callAttr("start");
            running = true;
        }
        return mBinder;
    }

    // This is the object that receives interactions from clients.  See
    // RemoteService for a more complete example.
    private final IBinder mBinder = new CertBinder();

    /**
     * Show a notification while this service is running.
     */
    private void showNotification() {
        // In this sample, we'll use the same text for the ticker and the expanded notification
        CharSequence text = getText(R.string.configure);

        // The PendingIntent to launch our activity if the user selects this notification
        PendingIntent contentIntent = PendingIntent.getActivity(this, 0,
                new Intent(this, CertServiceWidgetConfigureActivity.class), 0);

        // Set the info for the views that show in the notification panel.
        Notification notification = new Notification.Builder(this)
                .setSmallIcon(R.drawable.ic_launcher_foreground)  // the status icon
                .setTicker(text)  // the status text
                .setWhen(System.currentTimeMillis())  // the time stamp
                .setContentTitle(getText(R.string.configure))  // the label of the entry
                .setContentText(text)  // the contents of the entry
                .setContentIntent(contentIntent)  // The intent to send when the entry is clicked
                .setOngoing(true)
                .build();

        // Send the notification.
        startForeground(1001, notification);
    }
}
