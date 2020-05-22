package com.immune;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.chaquo.python.Python;
import com.chaquo.python.android.AndroidPlatform;

public class CertService extends Service {

    private Thread serviceThread;

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Toast.makeText(this, "service starting", Toast.LENGTH_SHORT).show();
        if (!Python.isStarted()) Python.start(new AndroidPlatform(this));
        serviceThread = new Thread(() -> Python.getInstance()
                .getModule("cert_service").callAttr("main"));
        serviceThread.start();
        // If we get killed, after returning from here, restart
        return START_STICKY;
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        // We don't provide binding, so return null
        return null;
    }

    @Override
    public void onDestroy() {
        Toast.makeText(this, "service done", Toast.LENGTH_SHORT).show();
    }
}
