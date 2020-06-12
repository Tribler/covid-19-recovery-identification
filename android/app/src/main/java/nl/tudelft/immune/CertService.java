package nl.tudelft.immune;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.Build;
import android.os.IBinder;
import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;
import com.chaquo.python.Python;
import com.chaquo.python.android.AndroidPlatform;

// TODO Remove from Service Cache?

/**
 * Implementation of the service initializer.
 */
public class CertService extends Service {

  // Information about the service's state. Prevents from starting
  // or stopping the service more than once.
  private static Boolean running = false;

  // The identifier of the custom channel needed in APIs 26+
  private static final String CHANNEL_ID = "Certification Service Channel";

//  /**
//   * Creation method. Gets called whenever the gui tries to bind to the service or
//   * a new widget gets created. Responsible for creating a persistent notification,
//   * creating a custom notification channel and changing the state of the service
//   * to foreground service.
//   */
//  @Override
//  public void onCreate() {
//    super.onCreate();
//  }

  /**
   * Destruction method. Gets called whenever the gui tries to unbind from the service or
   * the last existing widget gets deleted. Responsible for using the Chaquopy's bridge for
   * stopping the service, removing the persistent notification from the foreground,
   * deleting the custom notification channel and stopping the foreground service.
   */
  @Override
  public void onDestroy() {
    stopService();
    super.onDestroy();
  }

  /**
   * Start method. Gets called whenever the widget creates a new instance of the service.
   * Responsible for starting the service.
   * @return The flag indicating that the os should not try to restart the service if it has
   *         previously stopped it.
   */
  @Override
  public int onStartCommand(Intent intent, int flags, int startId) {
    startService();
    return START_NOT_STICKY;
  }

  /**
   * Start method. Gets called whenever the gui creates a new instance of the service.
   * Responsible for starting the service.
   * @return The binder which provides access of the service object to clients.
   */
  @Nullable
  @Override
  public IBinder onBind(Intent intent) {
    startService();
    return certBinder;
  }

  // The binder that provides connection with the service to clients.
   private final IBinder certBinder = new CertBinder();
   /*
     Binder class that provides service control methods
     to all clients which bind to the service.
    */
   class CertBinder extends Binder {
     CertService getService() {
       return CertService.this;
     }
   }

  /**
   * Helper method. Gets called when the service is being started.
   * Responsible for starting the python service through Chaquopy's bridge.
   */
  private void startService() {
    if (!running) {
      if (!Python.isStarted()) {
        Python.start(new AndroidPlatform(this));
      }
      Python.getInstance().getModule("certificate_service").callAttr("start");
      running = true;
      Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
          .setSmallIcon(R.drawable.ic_launcher_foreground)
          .setTicker(getText(R.string.foreground_service_text))
          .setContentTitle(getText(R.string.foreground_service_description))
          .setContentText(getText(R.string.foreground_service_text))
          .setPriority(NotificationCompat.PRIORITY_LOW)
          .build();
      createNotificationChannel();
      startForeground(android.os.Process.myPid(), notification);
    }
  }

  private void stopService() {
    if (running) {
      Python.getInstance().getModule("certificate_service").callAttr("stop");
      running = false;
      deleteNotificationChannel();
      stopForeground(true);
      android.os.Process.killProcess(android.os.Process.myPid()); // TODO Remove?
    }
  }

  /**
   * Helper method. Gets called when the service is being started.
   * Responsible for creating the notification channel.
   */
  private void createNotificationChannel() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      CharSequence name = getString(R.string.foreground_channel_text);
      String description = getString(R.string.foreground_channel_description);
      int importance = NotificationManager.IMPORTANCE_LOW;
      NotificationChannel channel = new NotificationChannel(CHANNEL_ID, name, importance);
      channel.setDescription(description);
      NotificationManager notificationManager = getSystemService(NotificationManager.class);
      assert notificationManager != null;
      notificationManager.createNotificationChannel(channel);
    }
  }

  /**
   * Helper method. Gets called when the service is being stopped.
   * Responsible for deleting the notification channel.
   */
  private void deleteNotificationChannel() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      NotificationManager notificationManager = getSystemService(NotificationManager.class);
      assert notificationManager != null;
      notificationManager.deleteNotificationChannel(CHANNEL_ID);
    }
  }
}
