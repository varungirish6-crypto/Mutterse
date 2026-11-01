import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mothersafe360.app',
  appName: 'Mutterse',
  webDir: 'dist',
  server: {
    // Use inline web assets (no live-reload server) for the APK build
    androidScheme: 'https',
  },
  plugins: {
    StatusBar: {
      // Transparent overlay so the app can draw edge-to-edge
      overlaysWebView: true,
      style: 'LIGHT',
      backgroundColor: '#F7FAF7',
    },
    Keyboard: {
      // Resize content so inputs aren't hidden behind the keyboard
      resize: 'body',
      resizeOnFullScreen: true,
    },
  },
  android: {
    // Allow mixed-content if needed for local assets
    allowMixedContent: true,
    backgroundColor: '#F7FAF7',
  },
};

export default config;
