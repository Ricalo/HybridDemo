package com.microsoft.graph.hybrid;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebView;

public class MicrosoftSignInActivity extends AppCompatActivity {
  private WebView mAuthWebView;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_microsoft_sign_in);

    mAuthWebView = (WebView)findViewById(R.id.webView);

    mAuthWebView.loadUrl("https://firebasehybrid.azurewebsites.net/microsoft/signin");
  }
}
