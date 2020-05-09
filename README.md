# Immunity Passports
## Building a Critical Infrastructure for the Nation-Wide Identification of Recovered COVID-19 Patients

### Background Services Android Overview
#### This information comes straight from [Android's Developer Documentation](https://developer.android.com/docs) 
The certification service needs to run as a Background service on Android. The service gets
started by components whenever the callback method: onStartCommand() is implemented. Normally
any application component can use the service (even from a separate application) in the same
way that any component can use an activity - by starting it with an _Intent_. However, the
service can be declared as _private_ in the manifest file and block access from other
applications.

*Caution*: A service runs in the main thread of its hosting process; the service does not create
its own thread and does not run in a separate process unless you specify otherwise. If your
service is going to perform any CPU-intensive work or blocking operations, such networking, you
should create a new thread within the service to complete that work. NOTE: Read the documentation
on _Processes and Threading_.

#### The Basics
To create a service, you must create a subclass of _Service_ or use one of its existing
subclasses. In your implementation, you must override some callback methods that handle key
aspects of the service lifecycle and provide a mechanism that allows the components to bind to
the service, if appropriate.

These are the most important callback methods that you should override:

_onStartCommand()_

The system invokes this method by calling startService() when another component (such as an
activity) requests that the service be started. When this method executes, the service is started
and can run in the background indefinitely. If you implement this, it is your responsibility to
stop the service when its work is complete by calling stopSelf() or stopService(). If you only
want to provide binding, you don't need to implement this method.

_onBind()_

The system invokes this method by calling bindService() when another component wants to bind with
the service (such as to perform RPC). In your implementation of this method, you must provide an
interface that clients use to communicate with the service by returning an IBinder. You must
always implement this method; however, if you don't want to allow binding, you should return null.

_onCreate()_

The system invokes this method to perform one-time setup procedures when the service is initially
created (before it calls either onStartCommand() or onBind()). If the service is already running,
this method is not called.

_onDestroy()_

The system invokes this method when the service is no longer used and is being destroyed. Your
service should implement this to clean up any resources such as threads, registered listeners, or
receivers. This is the last call that the service receives.

If a component starts the service by calling startService() (which results in a call to
onStartCommand()), the service continues to run until it stops itself with stopSelf() or another
component stops it by calling stopService().

The Android system stops a service only when memory is low, and it must recover system resources
for the activity that has user focus. If the service is bound to an activity that has user focus,
it's less likely to be killed; if the service is declared to run in the foreground, it's rarely
killed. If the service is started and is long-running, the system lowers its position in the list
of background tasks over time, and the service becomes highly susceptible to killing—if your
service is started, you must design it to gracefully handle restarts by the system. If the system
kills your service, it restarts it as soon as resources become available, but this also depends
on the value that you return from onStartCommand(). For more information about when the system
might destroy a service, see the _Processes and Threading_ document.

There needs to be a way to restart the service automatically if something goes wrong with it or
the device restarts.

More information here: [Services](https://developer.android.com/guide/components/services)
