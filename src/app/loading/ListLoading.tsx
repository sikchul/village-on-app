import { Spinner } from '@shared/ui/spinner';

import styles from './ListLoading.module.scss';

export default function ListLoading() {
  return <Spinner name="crescent" className={styles['list-loading']} />;
}
