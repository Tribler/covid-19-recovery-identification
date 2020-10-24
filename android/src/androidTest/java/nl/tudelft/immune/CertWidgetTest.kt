//package nl.tudelft.immune
//
//import androidx.test.core.app.ApplicationProvider
//import androidx.test.ext.junit.runners.AndroidJUnit4
//import org.junit.After
//import org.junit.Assert
//import org.junit.Before
//import org.junit.Test
//import org.junit.runner.RunWith
//import java.time.Duration
//import java.time.Instant
//import java.util.concurrent.TimeUnit
//
//@RunWith(AndroidJUnit4::class)
//class CertWidgetTest {
//  private var certWidget: CertWidget? = null
//
//  @Before
//  fun setUp() {
//    assert(!CertService.running)
//    certWidget = CertWidget()
//  }
//
//  @After
//  fun destroy() {
//    if (CertService.running) {
//      certWidget!!.onDisabled(ApplicationProvider.getApplicationContext())
//    }
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
//  fun onEnabled() {
//    certWidget!!.onEnabled(ApplicationProvider.getApplicationContext())
//    waitService(true)
//    Assert.assertTrue(CertService.running)
//  }
//
//  @Test
//  @Throws(InterruptedException::class)
//  fun onDisabled() {
//    certWidget!!.onEnabled(ApplicationProvider.getApplicationContext())
//    waitService(true)
//    assert(CertService.running)
//    certWidget!!.onDisabled(ApplicationProvider.getApplicationContext())
//    waitService(false)
//    Assert.assertFalse(CertService.running)
//  }
//}
