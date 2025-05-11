import { ReactNode } from 'react';
import style from './base-content-container.module.scss';
export default function BaseContentContainer({ children }: { children: ReactNode }) {
  return <div className={style.container}>{children}</div>;
}
