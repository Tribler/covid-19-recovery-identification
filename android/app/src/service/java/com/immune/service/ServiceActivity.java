package com.immune.service;

import android.app.Activity;
import android.os.Bundle;

import androidx.annotation.Nullable;

public class ServiceActivity extends Activity {

  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    finish();
  }
}
