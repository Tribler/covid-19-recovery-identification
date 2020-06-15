package nl.tudelft.immune;

import androidx.lifecycle.Lifecycle;
import androidx.test.core.app.ActivityScenario;
import androidx.test.core.app.ApplicationProvider;
import androidx.test.ext.junit.rules.ActivityScenarioRule;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
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

  @Before
  public void destroy() {
    scenario = null;
    certWidget = null;
  }

  @Test
  public void runningServiceOnInitialized() {
    scenario.moveToState(Lifecycle.State.INITIALIZED);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void runningServiceOnCreated() {
    scenario.moveToState(Lifecycle.State.CREATED);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void runningServiceOnStarted() {
    scenario.moveToState(Lifecycle.State.STARTED);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void runningServiceOnResumed() {
    scenario.moveToState(Lifecycle.State.RESUMED);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void runningServiceOnDestroyed() {
    scenario.moveToState(Lifecycle.State.DESTROYED);
    assertFalse(CertService.getRunning());
  }

  @Test
  public void startingServiceThroughWidgetOnInitialized() {
    scenario.moveToState(Lifecycle.State.INITIALIZED);
    assert CertService.getRunning();
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    assertTrue(CertService.getRunning());
  }

  @Test
  public void stoppingServiceThroughWidgetOnInitialized() {
    scenario.moveToState(Lifecycle.State.INITIALIZED);
    assert CertService.getRunning();
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    certWidget.onDisabled(ApplicationProvider.getApplicationContext());
    assertTrue(CertService.getRunning());
  }

  @Test
  public void startingServiceThroughWidgetOnCreated() {
    scenario.moveToState(Lifecycle.State.CREATED);
    assert CertService.getRunning();
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    assertTrue(CertService.getRunning());
  }

  @Test
  public void stoppingServiceThroughWidgetOnCreated() {
    scenario.moveToState(Lifecycle.State.CREATED);
    assert CertService.getRunning();
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    certWidget.onDisabled(ApplicationProvider.getApplicationContext());
    assertTrue(CertService.getRunning());
  }

  @Test
  public void startingServiceThroughWidgetOnStarted() {
    scenario.moveToState(Lifecycle.State.STARTED);
    assert CertService.getRunning();
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    assertTrue(CertService.getRunning());
  }

  @Test
  public void stoppingServiceThroughWidgetOnStarted() {
    scenario.moveToState(Lifecycle.State.STARTED);
    assert CertService.getRunning();
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    certWidget.onDisabled(ApplicationProvider.getApplicationContext());
    assertTrue(CertService.getRunning());
  }

  @Test
  public void startingServiceThroughWidgetOnResumed() {
    scenario.moveToState(Lifecycle.State.RESUMED);
    assert CertService.getRunning();
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    assertTrue(CertService.getRunning());
  }

  @Test
  public void stoppingServiceThroughWidgetOnResumed() {
    scenario.moveToState(Lifecycle.State.RESUMED);
    assert CertService.getRunning();
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    certWidget.onDisabled(ApplicationProvider.getApplicationContext());
    assertTrue(CertService.getRunning());
  }

  @Test
  public void startingServiceThroughWidgetOnDestroyed() {
    scenario.moveToState(Lifecycle.State.DESTROYED);
    assert !CertService.getRunning();
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    assertTrue(CertService.getRunning());
  }

  @Test
  public void stoppingServiceThroughWidgetOnDestroyed() {
    scenario.moveToState(Lifecycle.State.DESTROYED);
    assert !CertService.getRunning();
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    certWidget.onDisabled(ApplicationProvider.getApplicationContext());
    assertFalse(CertService.getRunning());
  }

  @Test
  public void startingServiceThroughActivityOnInitialized() {
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    scenario.moveToState(Lifecycle.State.INITIALIZED);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void stoppingServiceThroughActivityOnInitialized() {
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    certWidget.onDisabled(ApplicationProvider.getApplicationContext());
    scenario.moveToState(Lifecycle.State.INITIALIZED);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void startingServiceThroughActivityOnCreated() {
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    scenario.moveToState(Lifecycle.State.CREATED);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void stoppingServiceThroughActivityOnCreated() {
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    certWidget.onDisabled(ApplicationProvider.getApplicationContext());
    scenario.moveToState(Lifecycle.State.CREATED);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void startingServiceThroughActivityOnStarted() {
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    scenario.moveToState(Lifecycle.State.STARTED);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void stoppingServiceThroughActivityOnStarted() {
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    certWidget.onDisabled(ApplicationProvider.getApplicationContext());
    scenario.moveToState(Lifecycle.State.STARTED);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void startingServiceThroughActivityOnResumed() {
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    scenario.moveToState(Lifecycle.State.RESUMED);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void stoppingServiceThroughActivityOnResumed() {
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    certWidget.onDisabled(ApplicationProvider.getApplicationContext());
    scenario.moveToState(Lifecycle.State.RESUMED);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void startingServiceThroughActivityOnDestroyed() {
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    scenario.moveToState(Lifecycle.State.DESTROYED);
    assertTrue(CertService.getRunning());
  }

  @Test
  public void stoppingServiceThroughActivityOnDestroyed() {
    certWidget.onEnabled(ApplicationProvider.getApplicationContext());
    certWidget.onDisabled(ApplicationProvider.getApplicationContext());
    scenario.moveToState(Lifecycle.State.DESTROYED);
    assertFalse(CertService.getRunning());
  }

}
