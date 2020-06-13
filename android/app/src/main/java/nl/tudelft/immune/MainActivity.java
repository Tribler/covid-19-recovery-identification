package nl.tudelft.immune;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.IBinder;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  // Information about the service's state.
  // Prevents from unwanted unbinding.
  private transient boolean shouldUnbind;

//  public boolean isShouldUnbind() {
//    return shouldUnbind;
//  }

  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Immune";
  }

  /**
   * Creation method. Gets called when the gui gets started.
   * Responsible for binding to the service from the start.
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    bindService();
  }

  /**
   * Destruction method. Gets called when the gui is being closed.
   * Responsible for unbinding from the service at the end of the app's lifecycle.
   */
  @Override
  protected void onDestroy() {
    super.onDestroy();
    unbindService();
  }

  /**
   * Helper method. Attempts to establish a connection with the service.
   */
  private void bindService() {
    if (!shouldUnbind) {
      bindService(new Intent(this, CertService.class),
          connection, Context.BIND_AUTO_CREATE);
      shouldUnbind = true;
    }
  }

  /**
   * Helper method. Releases information about the service's state.
   */
  private void unbindService() {
    if (shouldUnbind) {
      unbindService(connection);
      shouldUnbind = false;
    }
  }

  // This object is responsible for the connection with the service
  // and its initialization.
  private transient ServiceConnection connection = new ServiceConnection() {
    /**
     * This is called when the connection with the service has been established,
     * giving us the service object we can use to interact with the service.
     */
    public void onServiceConnected(ComponentName className, IBinder service) {
      CertService.CertBinder binder = (CertService.CertBinder) service;
      binder.getService().startService();
    }

    /**
     * This is called when the connection with the service has been
     * unexpectedly disconnected -- that is, its process crashed.
     */
    public void onServiceDisconnected(ComponentName className) {
    }
  };
}
