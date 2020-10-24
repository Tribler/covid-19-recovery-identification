//package nl.tudelft.immune
//
//import androidx.lifecycle.Lifecycle
//import androidx.test.core.app.ActivityScenario
//import androidx.test.core.app.ApplicationProvider
//import androidx.test.ext.junit.rules.ActivityScenarioRule
//import androidx.test.ext.junit.runners.AndroidJUnit4
//import org.junit.*
//import org.junit.runner.RunWith
//import java.time.Duration
//import java.time.Instant
//import java.util.concurrent.TimeUnit
//
//@RunWith(AndroidJUnit4::class)
//class MainActivityTest {
//  private var certWidget: CertWidget? = null
//  private var scenario: ActivityScenario<MainActivity>? = null
//
//  @Rule
//  val activityRule = ActivityScenarioRule(MainActivity::class.java)
//
//  @Before
//  fun setUp() {
//    assert(!CertService.running)
//    scenario = activityRule.scenario
//    certWidget = CertWidget()
//  }
//
//  @After
//  fun destroy() {
//    if (CertService.running) {
//      scenario!!.moveToState(Lifecycle.State.DESTROYED)
//      certWidget!!.onDisabled(ApplicationProvider.getApplicationContext())
//    }
//    scenario = null
//    certWidget = null
//  }
//
//  @Throws(InterruptedException::class)
//  fun waitService(running: Boolean) {
//    val start = Instant.now()
//    if (running) {
//      while (!CertService.running
//        && Duration.between(start, Instant.now()).seconds < 5) {
//        TimeUnit.MILLISECONDS.sleep(100)
//      }
//    } else {
//      while (CertService.running
//        && Duration.between(start, Instant.now()).seconds < 5) {
//        TimeUnit.MILLISECONDS.sleep(100)
//      }
//    }
//  }
//
//  @Test
//  @Throws(InterruptedException::class)
//  fun runningServiceOnCreated() {
//    scenario!!.moveToState(Lifecycle.State.CREATED)
//    waitService(true)
//    Assert.assertTrue(CertService.running)
//  }
//
//  @Test
//  @Throws(InterruptedException::class)
//  fun runningServiceOnStarted() {
//    scenario!!.moveToState(Lifecycle.State.STARTED)
//    waitService(true)
//    Assert.assertTrue(CertService.running)
//  }
//
//  @Test
//  @Throws(InterruptedException::class)
//  fun runningServiceOnResumed() {
//    scenario!!.moveToState(Lifecycle.State.RESUMED)
//    waitService(true)
//    Assert.assertTrue(CertService.running)
//  }
//
//  @Test
//  @Throws(InterruptedException::class)
//  fun runningServiceOnDestroyed() {
//    scenario!!.moveToState(Lifecycle.State.CREATED)
//    waitService(true)
//    assert(CertService.running)
//    scenario!!.moveToState(Lifecycle.State.DESTROYED)
//    waitService(false)
//    Assert.assertFalse(CertService.running)
//  }
//
//  @Test
//  @Throws(InterruptedException::class)
//  fun startingServiceThroughWidgetOnCreated() {
//    scenario!!.moveToState(Lifecycle.State.CREATED)
//    waitService(true)
//    assert(CertService.running)
//    certWidget!!.onEnabled(ApplicationProvider.getApplicationContext())
//    waitService(true)
//    Assert.assertTrue(CertService.running)
//  }
//
//  @Test
//  @Throws(InterruptedException::class)
//  fun stoppingServiceThroughWidgetOnCreated() {
//    scenario!!.moveToState(Lifecycle.State.CREATED)
//    waitService(true)
//    assert(CertService.running)
//    certWidget!!.onEnabled(ApplicationProvider.getApplicationContext())
//    waitService(true)
//    certWidget!!.onDisabled(ApplicationProvider.getApplicationContext())
//    waitService(true)
//    Assert.assertTrue(CertService.running)
//  }
//
//  @Test
//  @Throws(InterruptedException::class)
//  fun startingServiceThroughWidgetOnStarted() {
//    scenario!!.moveToState(Lifecycle.State.STARTED)
//    waitService(true)
//    assert(CertService.running)
//    certWidget!!.onEnabled(ApplicationProvider.getApplicationContext())
//    waitService(true)
//    Assert.assertTrue(CertService.running)
//  }
//
//  @Test
//  @Throws(InterruptedException::class)
//  fun stoppingServiceThroughWidgetOnStarted() {
//    scenario!!.moveToState(Lifecycle.State.STARTED)
//    waitService(true)
//    assert(CertService.running)
//    certWidget!!.onEnabled(ApplicationProvider.getApplicationContext())
//    waitService(true)
//    certWidget!!.onDisabled(ApplicationProvider.getApplicationContext())
//    waitService(true)
//    Assert.assertTrue(CertService.running)
//  }
//
//  @Test
//  @Throws(InterruptedException::class)
//  fun startingServiceThroughWidgetOnResumed() {
//    scenario!!.moveToState(Lifecycle.State.RESUMED)
//    waitService(true)
//    assert(CertService.running)
//    certWidget!!.onEnabled(ApplicationProvider.getApplicationContext())
//    waitService(true)
//    Assert.assertTrue(CertService.running)
//  }
//
//  @Test
//  @Throws(InterruptedException::class)
//  fun stoppingServiceThroughWidgetOnResumed() {
//    scenario!!.moveToState(Lifecycle.State.RESUMED)
//    waitService(true)
//    assert(CertService.running)
//    certWidget!!.onEnabled(ApplicationProvider.getApplicationContext())
//    waitService(true)
//    certWidget!!.onDisabled(ApplicationProvider.getApplicationContext())
//    waitService(true)
//    Assert.assertTrue(CertService.running)
//  }
//
//  @Test
//  @Throws(InterruptedException::class)
//  fun startingServiceThroughWidgetOnDestroyed() {
//    scenario!!.moveToState(Lifecycle.State.CREATED)
//    waitService(true)
//    scenario!!.moveToState(Lifecycle.State.DESTROYED)
//    waitService(false)
//    assert(!CertService.running)
//    certWidget!!.onEnabled(ApplicationProvider.getApplicationContext())
//    waitService(true)
//    Assert.assertTrue(CertService.running)
//  }
//
//  @Test
//  @Throws(InterruptedException::class)
//  fun stoppingServiceThroughWidgetOnDestroyed() {
//    scenario!!.moveToState(Lifecycle.State.CREATED)
//    waitService(true)
//    scenario!!.moveToState(Lifecycle.State.DESTROYED)
//    waitService(false)
//    assert(!CertService.running)
//    certWidget!!.onEnabled(ApplicationProvider.getApplicationContext())
//    waitService(true)
//    certWidget!!.onDisabled(ApplicationProvider.getApplicationContext())
//    waitService(false)
//    Assert.assertFalse(CertService.running)
//  }
//
//  @Test
//  @Throws(InterruptedException::class)
//  fun startingServiceThroughActivityOnCreated() {
//    certWidget!!.onEnabled(ApplicationProvider.getApplicationContext())
//    waitService(true)
//    scenario!!.moveToState(Lifecycle.State.CREATED)
//    waitService(true)
//    Assert.assertTrue(CertService.running)
//  }
//
//  @Test
//  @Throws(InterruptedException::class)
//  fun stoppingServiceThroughActivityOnCreated() {
//    certWidget!!.onEnabled(ApplicationProvider.getApplicationContext())
//    waitService(true)
//    certWidget!!.onDisabled(ApplicationProvider.getApplicationContext())
//    waitService(false)
//    scenario!!.moveToState(Lifecycle.State.CREATED)
//    waitService(true)
//    Assert.assertTrue(CertService.running)
//  }
//
//  @Test
//  @Throws(InterruptedException::class)
//  fun startingServiceThroughActivityOnStarted() {
//    certWidget!!.onEnabled(ApplicationProvider.getApplicationContext())
//    waitService(true)
//    scenario!!.moveToState(Lifecycle.State.STARTED)
//    waitService(true)
//    Assert.assertTrue(CertService.running)
//  }
//
//  @Test
//  @Throws(InterruptedException::class)
//  fun stoppingServiceThroughActivityOnStarted() {
//    certWidget!!.onEnabled(ApplicationProvider.getApplicationContext())
//    waitService(true)
//    certWidget!!.onDisabled(ApplicationProvider.getApplicationContext())
//    waitService(false)
//    scenario!!.moveToState(Lifecycle.State.STARTED)
//    waitService(true)
//    Assert.assertTrue(CertService.running)
//  }
//
//  @Test
//  @Throws(InterruptedException::class)
//  fun startingServiceThroughActivityOnResumed() {
//    certWidget!!.onEnabled(ApplicationProvider.getApplicationContext())
//    waitService(true)
//    scenario!!.moveToState(Lifecycle.State.RESUMED)
//    waitService(true)
//    Assert.assertTrue(CertService.running)
//  }
//
//  @Test
//  @Throws(InterruptedException::class)
//  fun stoppingServiceThroughActivityOnResumed() {
//    certWidget!!.onEnabled(ApplicationProvider.getApplicationContext())
//    waitService(true)
//    certWidget!!.onDisabled(ApplicationProvider.getApplicationContext())
//    waitService(false)
//    scenario!!.moveToState(Lifecycle.State.RESUMED)
//    waitService(true)
//    Assert.assertTrue(CertService.running)
//  }
//
//  @Test
//  @Throws(InterruptedException::class)
//  fun startingServiceThroughActivityOnDestroyed() {
//    certWidget!!.onEnabled(ApplicationProvider.getApplicationContext())
//    waitService(true)
//    scenario!!.moveToState(Lifecycle.State.CREATED)
//    waitService(true)
//    scenario!!.moveToState(Lifecycle.State.DESTROYED)
//    waitService(true)
//    Assert.assertTrue(CertService.running)
//  }
//
//  @Test
//  @Throws(InterruptedException::class)
//  fun stoppingServiceThroughActivityOnDestroyed() {
//    certWidget!!.onEnabled(ApplicationProvider.getApplicationContext())
//    waitService(true)
//    certWidget!!.onDisabled(ApplicationProvider.getApplicationContext())
//    waitService(false)
//    scenario!!.moveToState(Lifecycle.State.CREATED)
//    waitService(true)
//    scenario!!.moveToState(Lifecycle.State.DESTROYED)
//    waitService(false)
//    Assert.assertFalse(CertService.running)
//  }
//}
