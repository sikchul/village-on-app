import { ScreenOrientation } from '@capacitor/screen-orientation';
import { useEffect } from 'react';

export default function CapacitorOrientationHandler() {
  useEffect(() => {
    // 앱 시작 시 세로모드로 고정
    const lockOrientation = async () => {
      try {
        await ScreenOrientation.lock({ orientation: 'portrait' });
      } catch (error) {
        console.log('Screen orientation lock failed:', error);
      }
    };

    lockOrientation();
  }, []);

  return null;
}
