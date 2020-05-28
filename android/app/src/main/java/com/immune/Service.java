package com.immune;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Binder;
import android.os.Build;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.chaquo.python.Python;
import com.chaquo.python.android.AndroidPlatform;

public class Service extends android.app.Service {

    private static Boolean running = false;

    private static final String CHANNEL_ID = "Certification Service Channel";

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
        if (Service.running) {
            Python.getInstance().getModule("cert_service").callAttr("stop");
            //android.os.Process.sendSignal(android.os.Process.myPid(), 15);
            //android.os.Process.killProcess(android.os.Process.myPid());
            Service.running = false;
            deleteNotificationChannel();
            Log.i("CertService", "Stops");
        }
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.i("CertService", "Starts");
        if (!Service.running) {
            Python.getInstance().getModule("cert_service").callAttr("start");
            Service.running = true;
            showNotification();
        }
        return START_NOT_STICKY;
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        if (!Service.running) {
            Log.i("CertService", "Starts");
            Python.getInstance().getModule("cert_service").callAttr("start");
            Service.running = true;
            showNotification();
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
        CharSequence text = getText(R.string.foreground_service_text);
        // The PendingIntent to launch our activity if the user selects this notification
        PendingIntent contentIntent = PendingIntent.getActivity(this, 0,
                new Intent(this, MainActivity.class), 0);
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setSmallIcon(R.drawable.ic_launcher_foreground)  // the status icon
                .setTicker(text)  // the status text
                .setWhen(System.currentTimeMillis())  // the time stamp
                .setContentTitle(getText(R.string.foreground_service_description))
                .setContentText(text)  // the contents of the entry
                .setContentIntent(contentIntent)  // The intent to send when the entry is clicked
                .setPriority(NotificationCompat.PRIORITY_LOW)
                .setOngoing(true)
                .build();
        // Send the notification.
        createNotificationChannel();
        startForeground(1001, notification);
    }

    private void createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = getString(R.string.foreground_channel_text);
            String description = getString(R.string.foreground_channel_description);
            int importance = NotificationManager.IMPORTANCE_LOW;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, name, importance);
            channel.setDescription(description);
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            assert notificationManager != null;
            notificationManager.createNotificationChannel(channel);
        }
    }

    private void deleteNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            assert notificationManager != null;
            notificationManager.deleteNotificationChannel(CHANNEL_ID);
        }
    }

    /**
     * Class for clients to access.  Because we know this service always
     * runs in the same process as its clients, we don't need to deal with
     * IPC.
     */
    class CertBinder extends Binder {
        Service getService() {
            return Service.this;
        }
    }
}
