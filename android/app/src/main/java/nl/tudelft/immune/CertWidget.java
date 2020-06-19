package nl.tudelft.immune;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.widget.RemoteViews;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Implementation of the widget's behavior.
 */
public class CertWidget extends AppWidgetProvider {

  static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
    try {
      SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);  String appString = sharedPref.getString("appData", "{\"text\":'no data'}");  JSONObject appData = new JSONObject(appString);  // Construct the RemoteViews object
      RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.service_widget);
      views.setTextViewText(R.id.appwidget_text, appData.getString("text"));  // Instruct the widget manager to update the widget
      appWidgetManager.updateAppWidget(appWidgetId, views);
    }catch (JSONException e) {
      e.printStackTrace();
    }
  }

  @Override
  public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
    // There may be multiple widgets active, so update all of them
    for (int appWidgetId : appWidgetIds) {
      updateAppWidget(context, appWidgetManager, appWidgetId);
    }
  }

  /**
   * Setup method. Gets called with the creation of the first widget.
   * Responsible for starting the foreground service.
   *
   * @param context The main application's context.
   */
  @Override
  public void onEnabled(Context context) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      context.startForegroundService(new Intent(context, CertService.class));
    } else {
      context.startService(new Intent(context, CertService.class));
    }
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

