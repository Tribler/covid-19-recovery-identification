package com.immune;


import android.view.View;
import android.view.ViewGroup;
import android.view.ViewParent;

import androidx.test.espresso.ViewInteraction;
import androidx.test.filters.LargeTest;
import androidx.test.rule.ActivityTestRule;
import androidx.test.runner.AndroidJUnit4;

import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import static androidx.test.espresso.Espresso.onView;
import static androidx.test.espresso.action.ViewActions.click;
import static androidx.test.espresso.action.ViewActions.closeSoftKeyboard;
import static androidx.test.espresso.action.ViewActions.pressImeActionButton;
import static androidx.test.espresso.action.ViewActions.replaceText;
import static androidx.test.espresso.action.ViewActions.scrollTo;
import static androidx.test.espresso.matcher.ViewMatchers.isDisplayed;
import static androidx.test.espresso.matcher.ViewMatchers.withClassName;
import static androidx.test.espresso.matcher.ViewMatchers.withId;
import static androidx.test.espresso.matcher.ViewMatchers.withText;
import static org.hamcrest.Matchers.allOf;
import static org.hamcrest.Matchers.is;

@LargeTest
@RunWith(AndroidJUnit4.class)
public class MainActivityTest {

    @Rule
    public ActivityTestRule<MainActivity> mActivityTestRule = new ActivityTestRule<>(MainActivity.class);

    @Test
    public void mainActivityTest() {
        ViewInteraction appCompatButton = onView(
                allOf(withId(R.id.rn_redbox_reload_button), withText("Reload\n(R, R)"),
                        childAtPosition(
                                childAtPosition(
                                        withClassName(is("android.widget.LinearLayout")),
                                        3),
                                1),
                        isDisplayed()));
        appCompatButton.perform(click());

        ViewInteraction reactEditText = onView(
                allOf(childAtPosition(
                        childAtPosition(
                                withClassName(is("com.facebook.react.views.view.ReactViewGroup")),
                                3),
                        2),
                        isDisplayed()));
        reactEditText.perform(click());

        ViewInteraction reactEditText2 = onView(
                allOf(childAtPosition(
                        childAtPosition(
                                withClassName(is("com.facebook.react.views.view.ReactViewGroup")),
                                3),
                        2),
                        isDisplayed()));
        reactEditText2.perform(click());

        ViewInteraction reactEditText3 = onView(
                allOf(childAtPosition(
                        childAtPosition(
                                withClassName(is("com.facebook.react.views.view.ReactViewGroup")),
                                3),
                        2),
                        isDisplayed()));
        reactEditText3.perform(click());

        ViewInteraction reactEditText4 = onView(
                allOf(childAtPosition(
                        childAtPosition(
                                withClassName(is("com.facebook.react.views.view.ReactViewGroup")),
                                3),
                        2),
                        isDisplayed()));
        reactEditText4.perform(replaceText("test1"), closeSoftKeyboard());

        ViewInteraction reactEditText5 = onView(
                allOf(withText("test1"),
                        childAtPosition(
                                childAtPosition(
                                        withClassName(is("com.facebook.react.views.view.ReactViewGroup")),
                                        3),
                                2),
                        isDisplayed()));
        reactEditText5.perform(pressImeActionButton());

        ViewInteraction appCompatButton2 = onView(
                allOf(withId(android.R.id.button1), withText("OK"),
                        childAtPosition(
                                childAtPosition(
                                        withClassName(is("android.widget.ScrollView")),
                                        0),
                                3)));
        appCompatButton2.perform(scrollTo(), click());

        ViewInteraction appCompatButton3 = onView(
                allOf(withId(android.R.id.button1), withText("OK"),
                        childAtPosition(
                                childAtPosition(
                                        withClassName(is("android.widget.ScrollView")),
                                        0),
                                3)));
        appCompatButton3.perform(scrollTo(), click());

        ViewInteraction appCompatButton4 = onView(
                allOf(withId(android.R.id.button1), withText("OK"),
                        childAtPosition(
                                childAtPosition(
                                        withClassName(is("android.widget.ScrollView")),
                                        0),
                                3)));
        appCompatButton4.perform(scrollTo(), click());
    }

    private static Matcher<View> childAtPosition(
            final Matcher<View> parentMatcher, final int position) {

        return new TypeSafeMatcher<View>() {
            @Override
            public void describeTo(Description description) {
                description.appendText("Child at position " + position + " in parent ");
                parentMatcher.describeTo(description);
            }

            @Override
            public boolean matchesSafely(View view) {
                ViewParent parent = view.getParent();
                return parent instanceof ViewGroup && parentMatcher.matches(parent)
                        && view.equals(((ViewGroup) parent).getChildAt(position));
            }
        };
    }
}
