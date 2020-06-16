package nl.tudelft.immune;

import androidx.test.core.app.ApplicationProvider;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

@RunWith(AndroidJUnit4.class)
public class CertWidgetTest {

  private CertWidget certWidget;

  @Before
  public void setUp() {
    assert !CertService.getRunning();
    certWidget = new CertWidget();
  }

  @After
  public void destroy() {
    certWidget = null;
  }

  public void waitService(boolean running) throws InterruptedException {
    Instant start = Instant.now();
    if (running) {
      while (!CertService.getRunning()
          && Duration.between(start, Instant.now()).getSeconds() < 5) {
        TimeUnit.MILLISECONDS.sleep(100);
      }
    } else {
      while (CertService.getRunning()
          && Duration.between(start, Instant.now()).getSeconds() < 5) {
        TimeUnit.MILLISECONDS.sleep(100);
      }
    }
  }

  @Test
  public void onEnabled() throws InterruptedException {
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    waitService(true);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void onDisabled() throws InterruptedException {
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    waitService(true);
    assert CertService.getRunning();
    certWidget.onDisabled(ApplicationProvider.getApplicationContext());
    waitService(false);
    assertFalse(CertService.getRunning());
  }
}
