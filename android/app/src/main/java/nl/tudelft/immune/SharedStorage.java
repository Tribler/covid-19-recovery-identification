package nl.tudelft.immune;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Objects;

public class SharedStorage extends ReactContextBaseJavaModule {

  ReactApplicationContext context;

  public SharedStorage(ReactApplicationContext reactContext) {
    super(reactContext);
    context = reactContext;
  }

  @NonNull
  @Override
  public String getName() {
    return "SharedStorage";
  }

  @ReactMethod
  public void createWidget() {
    Context appContext = Objects.requireNonNull(getCurrentActivity()).getApplicationContext();
    Intent intent = createIntent(appContext, AppWidgetManager.ACTION_APPWIDGET_UPDATE);
    appContext.sendBroadcast(intent);
  }

  @ReactMethod
  public void destroyWidget() {
    Context appContext = Objects.requireNonNull(getCurrentActivity()).getApplicationContext();
    Intent intent = createIntent(appContext, AppWidgetManager.ACTION_APPWIDGET_UPDATE);
    appContext.sendBroadcast(intent);
  }

  // TODO Fix those after merge with testing/android branch!!!
//  private CertService certService;
//  @ReactMethod
//  public void startService() {
//
//  }
//
//  @ReactMethod
//  public void stopService() {
//
//  }

  // TODO Do we even need this?
  // I guess we can just add some more configs?
  @ReactMethod
  public void set(String message) {
    SharedPreferences.Editor editor =
        context.getSharedPreferences("DATA", Context.MODE_PRIVATE).edit();
    editor.putString("appData", message).apply();
    Context appContext = Objects.requireNonNull(getCurrentActivity()).getApplicationContext();
    Intent intent = createIntent(appContext, AppWidgetManager.ACTION_APPWIDGET_UPDATE);
    appContext.sendBroadcast(intent);
  }

  private Intent createIntent(Context appContext, String action) {
    Intent intent = new Intent(appContext, CertWidget.class);
    intent.setAction(action);
    int[] ids = AppWidgetManager.getInstance(appContext)
        .getAppWidgetIds(new ComponentName(appContext, CertWidget.class));
    intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids);
    return intent;
  }

}