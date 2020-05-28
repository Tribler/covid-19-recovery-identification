# Relevant Android Documentation
## Android Widgets
- The service stops whenever all widgets get destroyed.
- We can show notifications from the inbox.
- We can add a stop button.
- The number, size and spacing of cells can vary widely from device to device, and hence it is very important that your widget is flexible and can accommodate more or less space than anticipated. In fact, as the user resizes a widget, the system will respond with a dp size range in which your widget can redraw itself. Planning your widget resizing strategy across "size buckets" rather than variable grid dimensions will give you the most reliable results.
- https://developer.android.com/guide/topics/appwidgets/overview
- Can we prevent the widget from updating and do we want that? What about network/battery usage?
- https://developer.android.com/guide/practices/ui_guidelines/widget_design#anatomy_determining_size
- The <intent-filter> element must include an <action> element with the android:name attribute. This attribute specifies that the AppWidgetProvider accepts the ACTION_APPWIDGET_UPDATE broadcast. This is the only broadcast that you must explicitly declare. The AppWidgetManager automatically sends all other App Widget broadcasts to the AppWidgetProvider as necessary.
- Note: If the device is asleep when it is time for an update (as defined by updatePeriodMillis), then the device will wake up in order to perform the update. If you don't update more than once per hour, this probably won't cause significant problems for the battery life. If, however, you need to update more frequently and/or you do not need to update while the device is asleep, then you can instead perform updates based on an alarm that will not wake the device. To do so, set an alarm with an Intent that your AppWidgetProvider receives, using the AlarmManager. Set the alarm type to either ELAPSED_REALTIME or RTC, which will only deliver the alarm when the device is awake. Then set updatePeriodMillis to zero ("0").
- Should we use Pinned App Widget or better make a pinned shortcut?
- Should we have a Preview Image?
- https://developer.android.com/guide/topics/appwidgets#Basics
- Android Widgets and React-Native - https://medium.com/better-programming/react-native-how-to-build-a-home-screen-widget-for-ios-and-android-8b2d7db343cb

## Known Issues
- On API 29, 28 when the service is stoped it stays in cache and blocks the browser when http://localhost:8085 is used.