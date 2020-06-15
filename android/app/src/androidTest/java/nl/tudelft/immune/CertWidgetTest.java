package nl.tudelft.immune;

import androidx.test.core.app.ApplicationProvider;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
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

  @Before
  public void destroy() {
    certWidget = null;
  }

  @Test
  public void onEnabled() {
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    assertTrue(CertService.getRunning());
  }

  @Test
  public void onDisabled() {
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    assert CertService.getRunning();
    certWidget.onDisabled(ApplicationProvider.getApplicationContext());
    assertFalse(CertService.getRunning());
  }

}
