import { ReactNode } from 'react';
import containerStyle from './container.module.scss';

export default function Container({ children }: { children: ReactNode }) {
  return <div className={containerStyle.container}>{children}</div>;
}
