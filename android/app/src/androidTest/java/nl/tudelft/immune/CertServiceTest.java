package nl.tudelft.immune;

import android.Manifest;
import android.app.Notification;
import android.app.NotificationManager;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.IBinder;
import androidx.test.core.app.ApplicationProvider;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.filters.SdkSuppress;
import androidx.test.rule.ServiceTestRule;
import com.chaquo.python.Python;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import java.util.concurrent.TimeoutException;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

@RunWith(AndroidJUnit4.class)
public class CertServiceTest {

  @Rule
  public final ServiceTestRule serviceRule = new ServiceTestRule();

  private CertService service;

  @Before
  public void setUp() throws TimeoutException {
    Intent serviceIntent = new Intent(ApplicationProvider.getApplicationContext(),
        CertService.class);
    serviceRule.bindService(serviceIntent);
    IBinder binder = serviceRule.bindService(serviceIntent);
    // Get the reference to the service, or you can call public methods on the binder directly.
    service = ((CertService.CertBinder) binder).getService();
  }

  @After
  public void destroy() {
    if (CertService.getRunning()) {
      service.stopService();
    }
    serviceRule.unbindService();
    service = null;
  }

  @Test
  public void useAppContext() {
    // Verify that the service is working correctly.
    assertEquals("nl.tudelft.immune",
        service.getApplicationContext().getPackageName());
  }

  @Test
  public void startService() {
    assert !CertService.getRunning();
    service.startService();
    assertTrue(CertService.getRunning());
  }

  @Test
  public void stopService() {
    assert !CertService.getRunning();
    service.startService();
    assert CertService.getRunning();
    service.stopService();
    assertFalse(CertService.getRunning());
  }

  @Test
  public void pythonInstance() {
    assert !Python.isStarted();
    service.startService();
    assertTrue(Python.isStarted());
  }

  @Test
  public void notificationInstance() {
    assert service.getNotification() == null;
    service.startService();
    Notification notification = service.getNotification();
    assertEquals(service.getText(R.string.foreground_service_text), notification.tickerText);
  }

  @Test
  @SdkSuppress(minSdkVersion = 26)
  public void notificationChannelInstance() {
    service.startService();
    NotificationManager notificationManager = service.getSystemService(NotificationManager.class);
    assert notificationManager != null;
    assertEquals(notificationManager.getNotificationChannels().get(0).getId(),
        service.getNotificationChannel().getId());
  }

  @Test
  public void permissions() {
    assertEquals(PackageManager.PERMISSION_GRANTED,
        service.checkSelfPermission(Manifest.permission.INTERNET));
    assertEquals(PackageManager.PERMISSION_GRANTED,
        service.checkSelfPermission(Manifest.permission.FOREGROUND_SERVICE));
  }

}
