package com.immune;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.core.content.FileProvider;

import com.facebook.react.ReactActivity;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;


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
        // Install Code
        Intent intent = new Intent(Intent.ACTION_INSTALL_PACKAGE);
        intent.setData(getApkUri());
        intent.setFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        intent.putExtra(Intent.EXTRA_NOT_UNKNOWN_SOURCE, true);
        intent.putExtra(Intent.EXTRA_RETURN_RESULT, true);
        intent.putExtra(Intent.EXTRA_INSTALLER_PACKAGE_NAME,
                getApplicationInfo().packageName);
        startActivity(intent);
//        Uninstall code
//        Intent intent = new Intent(Intent.ACTION_UNINSTALL_PACKAGE);
//        intent.setData(Uri.parse(
//                "package:com.immune"));
//        startActivity(intent);
//        run
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

    /**
     * Returns a Uri pointing to the APK to install.
     */
    private Uri getApkUri() {
        // Before N, a MODE_WORLD_READABLE file could be passed via the ACTION_INSTALL_PACKAGE
        // Intent. Since N, MODE_WORLD_READABLE files are forbidden, and a FileProvider is
        // recommended.
        boolean useFileProvider = Build.VERSION.SDK_INT >= Build.VERSION_CODES.N;
        // Copy the given asset out into a file so that it can be installed.
        // Returns the path to the file.
        String tempFilename = "tmp.apk";
        byte[] buffer = new byte[16384];
        int fileMode = useFileProvider ? Context.MODE_PRIVATE : Context.MODE_WORLD_READABLE; // TODO Check this SHIT!
        try (InputStream is = getResources().openRawResource(R.raw.service);
             FileOutputStream fout = openFileOutput(tempFilename, fileMode)) {
            int n;
            while ((n = is.read(buffer)) >= 0) {
                fout.write(buffer, 0, n);
            }
        } catch (IOException e) {
            Log.i("InstallApk", "Failed to write temporary APK file", e);
        }
        if (useFileProvider) {
            File toInstall = new File(this.getFilesDir(), tempFilename);
            return FileProvider.getUriForFile(this, "com.immune", toInstall);
        } else {
            return Uri.fromFile(getFileStreamPath(tempFilename));
        }
    }
}
