package com.immune;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Immune";
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Intent start = new Intent().setAction("com.immune.android.START_SERVICE")
                .setFlags(Intent.FLAG_INCLUDE_STOPPED_PACKAGES);
        sendBroadcast(start);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Intent stop = new Intent().setAction("com.immune.android.STOP_SERVICE")
                .setFlags(Intent.FLAG_INCLUDE_STOPPED_PACKAGES);
        sendBroadcast(stop);
    }
}
