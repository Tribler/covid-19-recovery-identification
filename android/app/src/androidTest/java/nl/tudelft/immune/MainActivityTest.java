package nl.tudelft.immune;

import androidx.lifecycle.Lifecycle;
import androidx.test.core.app.ActivityScenario;
import androidx.test.core.app.ApplicationProvider;
import androidx.test.ext.junit.rules.ActivityScenarioRule;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.TimeUnit;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

@RunWith(AndroidJUnit4.class)
public class MainActivityTest {

  private CertWidget certWidget;

  private ActivityScenario<MainActivity> scenario;

  @Rule
  public final ActivityScenarioRule<MainActivity> activityRule =
      new ActivityScenarioRule<>(MainActivity.class);

  @Before
  public void setUp() {
    assert !CertService.getRunning();
    scenario = activityRule.getScenario();
    certWidget = new CertWidget();
  }

  @After
  public void destroy() {
    scenario = null;
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
  public void runningServiceOnCreated() throws InterruptedException {
    scenario.moveToState(Lifecycle.State.CREATED);
    waitService(true);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void runningServiceOnStarted() throws InterruptedException {
    scenario.moveToState(Lifecycle.State.STARTED);
    waitService(true);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void runningServiceOnResumed() throws InterruptedException {
    scenario.moveToState(Lifecycle.State.RESUMED);
    waitService(true);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void runningServiceOnDestroyed() throws InterruptedException {
    scenario.moveToState(Lifecycle.State.CREATED);
    waitService(true);
    assert CertService.getRunning();
    scenario.moveToState(Lifecycle.State.DESTROYED);
    waitService(false);
    assertFalse(CertService.getRunning());
  }

  @Test
  public void startingServiceThroughWidgetOnCreated() throws InterruptedException {
    scenario.moveToState(Lifecycle.State.CREATED);
    waitService(true);
    assert CertService.getRunning();
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    waitService(true);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void stoppingServiceThroughWidgetOnCreated() throws InterruptedException {
    scenario.moveToState(Lifecycle.State.CREATED);
    waitService(true);
    assert CertService.getRunning();
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    waitService(true);
    certWidget.onDisabled(ApplicationProvider.getApplicationContext());
    waitService(true);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void startingServiceThroughWidgetOnStarted() throws InterruptedException {
    scenario.moveToState(Lifecycle.State.STARTED);
    waitService(true);
    assert CertService.getRunning();
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    waitService(true);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void stoppingServiceThroughWidgetOnStarted() throws InterruptedException {
    scenario.moveToState(Lifecycle.State.STARTED);
    waitService(true);
    assert CertService.getRunning();
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    waitService(true);
    certWidget.onDisabled(ApplicationProvider.getApplicationContext());
    waitService(true);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void startingServiceThroughWidgetOnResumed() throws InterruptedException {
    scenario.moveToState(Lifecycle.State.RESUMED);
    waitService(true);
    assert CertService.getRunning();
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    waitService(true);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void stoppingServiceThroughWidgetOnResumed() throws InterruptedException {
    scenario.moveToState(Lifecycle.State.RESUMED);
    waitService(true);
    assert CertService.getRunning();
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    waitService(true);
    certWidget.onDisabled(ApplicationProvider.getApplicationContext());
    waitService(true);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void startingServiceThroughWidgetOnDestroyed() throws InterruptedException {
    scenario.moveToState(Lifecycle.State.CREATED);
    waitService(true);
    scenario.moveToState(Lifecycle.State.DESTROYED);
    waitService(false);
    assert !CertService.getRunning();
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    waitService(true);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void stoppingServiceThroughWidgetOnDestroyed() throws InterruptedException {
    scenario.moveToState(Lifecycle.State.CREATED);
    waitService(true);
    scenario.moveToState(Lifecycle.State.DESTROYED);
    waitService(false);
    assert !CertService.getRunning();
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    waitService(true);
    certWidget.onDisabled(ApplicationProvider.getApplicationContext());
    waitService(false);
    assertFalse(CertService.getRunning());
  }

  @Test
  public void startingServiceThroughActivityOnCreated() throws InterruptedException {
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    waitService(true);
    scenario.moveToState(Lifecycle.State.CREATED);
    waitService(true);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void stoppingServiceThroughActivityOnCreated() throws InterruptedException {
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    waitService(true);
    certWidget.onDisabled(ApplicationProvider.getApplicationContext());
    waitService(false);
    scenario.moveToState(Lifecycle.State.CREATED);
    waitService(true);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void startingServiceThroughActivityOnStarted() throws InterruptedException {
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    waitService(true);
    scenario.moveToState(Lifecycle.State.STARTED);
    waitService(true);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void stoppingServiceThroughActivityOnStarted() throws InterruptedException {
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    waitService(true);
    certWidget.onDisabled(ApplicationProvider.getApplicationContext());
    waitService(false);
    scenario.moveToState(Lifecycle.State.STARTED);
    waitService(true);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void startingServiceThroughActivityOnResumed() throws InterruptedException {
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    waitService(true);
    scenario.moveToState(Lifecycle.State.RESUMED);
    waitService(true);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void stoppingServiceThroughActivityOnResumed() throws InterruptedException {
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    waitService(true);
    certWidget.onDisabled(ApplicationProvider.getApplicationContext());
    waitService(false);
    scenario.moveToState(Lifecycle.State.RESUMED);
    waitService(true);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void startingServiceThroughActivityOnDestroyed() throws InterruptedException {
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    waitService(true);
    scenario.moveToState(Lifecycle.State.CREATED);
    waitService(true);
    scenario.moveToState(Lifecycle.State.DESTROYED);
    waitService(true);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void stoppingServiceThroughActivityOnDestroyed() throws InterruptedException {
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    waitService(true);
    certWidget.onDisabled(ApplicationProvider.getApplicationContext());
    waitService(false);
    scenario.moveToState(Lifecycle.State.CREATED);
    waitService(true);
    scenario.moveToState(Lifecycle.State.DESTROYED);
    waitService(false);
    assertFalse(CertService.getRunning());
  }

}
