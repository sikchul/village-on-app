import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.village.on.app',
  appName: 'VillageOn',
  webDir: 'dist',
  plugins: {
    StatusBar: {
      overlaysWebView: false
    },
    Keyboard: {
      resizeOnFullScreen: true
    }
  }
};

export default config;
