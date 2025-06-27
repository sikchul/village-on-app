import { useIonModal } from '@ionic/react';
import type { ComponentProps, ComponentType } from 'react';

export default function useModal<C extends ComponentType<ComponentProps<C>>>(
  component: C,
  componentProps: ComponentProps<C>
) {
  const [present, dismiss] = useIonModal(component, componentProps);

  return {
    present,
    dismiss
  };
}
