//package nl.tudelft.immune
//
//import android.Manifest
//import android.app.NotificationManager
//import android.content.Intent
//import android.content.pm.PackageManager
//import androidx.test.core.app.ApplicationProvider
//import androidx.test.ext.junit.runners.AndroidJUnit4
//import androidx.test.filters.SdkSuppress
//import androidx.test.rule.ServiceTestRule
//import com.chaquo.python.Python
//import nl.tudelft.immune.CertService.CertBinder
//import org.junit.*
//import org.junit.runner.RunWith
//import java.util.concurrent.TimeoutException
//
//@RunWith(AndroidJUnit4::class)
//class CertServiceTest {
//  @Rule
//  val serviceRule = ServiceTestRule()
//  private var service: CertService? = null
//
//  @Before
//  @Throws(TimeoutException::class)
//  fun setUp() {
//    val serviceIntent = Intent(ApplicationProvider.getApplicationContext(),
//      CertService::class.java)
//    val binder = serviceRule.bindService(serviceIntent)
//    // Get the reference to the service, or you can call public methods on the binder directly.
//    service = (binder as CertBinder).service
//  }
//
//  @After
//  fun destroy() {
//    if (CertService.running) {
//      service!!.stopService()
//    }
//    serviceRule.unbindService()
//    service = null
//  }
//
//  @Test
//  fun useAppContext() {
//    // Verify that the service is working correctly.
//    Assert.assertEquals("nl.tudelft.immune",
//      service!!.applicationContext.packageName)
//  }
//
//  @Test
//  fun startService() {
//    assert(!CertService.running)
//    service!!.startService()
//    Assert.assertTrue(CertService.running)
//  }
//
//  @Test
//  fun doubleStartService() {
//    assert(!CertService.running)
//    service!!.startService()
//    assert(CertService.running)
//    service!!.startService()
//    Assert.assertTrue(CertService.running)
//  }
//
//  @Test
//  fun stopService() {
//    assert(!CertService.running)
//    service!!.startService()
//    assert(CertService.running)
//    service!!.stopService()
//    Assert.assertFalse(CertService.running)
//  }
//
//  @Test
//  fun doubleStopService() {
//    assert(!CertService.running)
//    service!!.startService()
//    assert(CertService.running)
//    service!!.stopService()
//    assert(!CertService.running)
//    service!!.stopService()
//    Assert.assertFalse(CertService.running)
//  }
//
//  @Test
//  fun pythonInstance() {
//    assert(!Python.isStarted())
//    service!!.startService()
//    Assert.assertTrue(Python.isStarted())
//  }
//
//  @Test
//  fun notificationInstance() {
//    assert(service!!.notification == null)
//    service!!.startService()
//    val notification = service!!.notification
//    Assert.assertEquals(service!!.getText(R.string.foreground_service_text), notification?.tickerText)
//  }
//
//  @Test
//  @SdkSuppress(minSdkVersion = 26)
//  fun notificationChannelInstance() {
//    service!!.startService()
//    val notificationManager = service!!.getSystemService(NotificationManager::class.java)!!
//    Assert.assertEquals(notificationManager.notificationChannels[0].id,
//      service!!.notificationChannel?.id)
//  }
//
//  @Test
//  fun permissionsInternet() {
//    Assert.assertEquals(PackageManager.PERMISSION_GRANTED.toLong(),
//      service!!.checkSelfPermission(Manifest.permission.INTERNET).toLong())
//  }
//
//  @Test
//  fun permissionsForegroundService() {
//    Assert.assertEquals(PackageManager.PERMISSION_GRANTED.toLong(),
//      service!!.checkSelfPermission(Manifest.permission.FOREGROUND_SERVICE).toLong())
//  }
//}
