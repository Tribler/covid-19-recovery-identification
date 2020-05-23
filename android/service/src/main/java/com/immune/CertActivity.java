package com.immune;

import android.app.Activity;
import android.os.Bundle;

import androidx.annotation.Nullable;

/**
 * This Class is only going to be used for debugging.
 */
public class CertActivity extends Activity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        finish();
    }
}
