import { App } from '@capacitor/app';
import type { PluginListenerHandle } from '@capacitor/core';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function CapacitorBackButtonHandler() {
  const history = useHistory();

  useEffect(() => {
    let handler: PluginListenerHandle | undefined;

    const setupHandler = async () => {
      handler = await App.addListener('backButton', (event) => {
        if (event.canGoBack) {
          history.goBack();
        } else {
          App.exitApp();
        }
      });
    };

    setupHandler();

    return () => {
      handler?.remove();
    };
  }, [history]);

  return null;
}
