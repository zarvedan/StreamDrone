package com.streamdrone.app;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;

import com.facebook.react.modules.core.PermissionListener;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback;
import com.reactnativenavigation.NavigationActivity;

import org.devio.rn.splashscreen.SplashScreen;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MainActivity extends NavigationActivity implements OnImagePickerPermissionsCallback {
    private PermissionListener listener;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
        this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);

        //TODO si encore besoin (ouverture notif)
        Intent intent = getIntent();
        intent.setAction(Intent.ACTION_VIEW);

    }

    @Override
    public void onNewIntent(Intent intent) {
        intent.setAction(Intent.ACTION_VIEW); // <- add this line
        if (!getReactGateway().onNewIntent(intent)) {
            super.onNewIntent(intent);
        }
    }


    @Override
    public void setPermissionListener(PermissionListener listener) {
        this.listener = listener;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        if (listener != null) {
            listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
//        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }

}
