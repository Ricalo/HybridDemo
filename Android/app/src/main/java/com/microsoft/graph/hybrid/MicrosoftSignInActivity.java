package com.microsoft.graph.hybrid;

import android.content.Intent;
import android.graphics.Bitmap;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MicrosoftSignInActivity extends AppCompatActivity {
  private WebView mAuthWebView;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_microsoft_sign_in);

    mAuthWebView = (WebView)findViewById(R.id.webView);
    WebSettings webSettings = mAuthWebView.getSettings();
    webSettings.setJavaScriptEnabled(true);

    mAuthWebView.setWebViewClient(new WebViewClient(){
      @Override
      public void onPageFinished(WebView view, String url) {
        super.onPageFinished(view, url);

        if(url.contains("https://firebasehybrid.azurewebsites.net/microsoft/callback?code")) {
          Intent backToApp = new Intent(view.getContext(), MainActivity.class);
          startActivity(backToApp);
        }
      }
    });

    mAuthWebView.loadUrl("https://firebasehybrid.azurewebsites.net/microsoft/signin");
  }
}
