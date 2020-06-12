package nl.tudelft.immune;

import android.content.Intent;
import android.os.IBinder;

import androidx.test.core.app.ApplicationProvider;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.rule.ServiceTestRule;

import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.util.concurrent.TimeoutException;

import static org.junit.Assert.assertEquals;

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * @see <a href="http://d.android.com/tools/testing">Testing documentation</a>
 */
@RunWith(AndroidJUnit4.class)
public class CertServiceWidgetTest {

  @Rule
  public final ServiceTestRule serviceRule = new ServiceTestRule();

  @Test
  public void useAppContext() throws TimeoutException {
    Intent serviceIntent =
        new Intent(ApplicationProvider.getApplicationContext(),
            CertService.class);
    serviceRule.bindService(serviceIntent);
    IBinder binder = serviceRule.bindService(serviceIntent);
    // Get the reference to the service, or you can call public methods on the binder directly.
    CertService service = ((CertService.CertBinder) binder).getService();
    // Verify that the service is working correctly.
    assertEquals("nl.tudelft.immune",
        service.getApplicationContext().getPackageName());
  }

}
