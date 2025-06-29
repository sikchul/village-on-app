import { App } from '@capacitor/app';
import type { PluginListenerHandle } from '@capacitor/core';
import { useEffect } from 'react';

export default function CapacitorBackButtonHandler() {
  useEffect(() => {
    let handler: PluginListenerHandle | undefined;

    const setupHandler = async () => {
      handler = await App.addListener('backButton', (event) => {
        if (!event.canGoBack) {
          App.exitApp();
        }
      });
    };

    setupHandler();

    return () => {
      handler?.remove();
    };
  }, []);

  return null;
}
