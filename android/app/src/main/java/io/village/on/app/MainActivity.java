package io.village.on.app;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.kakao.sdk.common.KakaoSdk;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        KakaoSdk.init(this, getString(R.string.kakao_app_key));
    }
}
