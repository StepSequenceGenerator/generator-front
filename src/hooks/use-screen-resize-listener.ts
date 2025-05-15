import * as lodash from 'lodash';
import { useEffect, useState } from 'react';

function getScreenSize() {
  return typeof window !== 'undefined' ? window.innerWidth : 0;
}

export function useScreenResizeListener() {
  const [screenWidth, setScreenWidth] = useState(getScreenSize());

  const listenScreenResizeDebounce = lodash.debounce(listenScreenResize, 200);

  function listenScreenResize() {
    const width = getScreenSize();
    setScreenWidth(width);
  }

  useEffect(() => {
    setScreenWidth(getScreenSize());
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', listenScreenResizeDebounce);
      return () => {
        window.removeEventListener('resize', listenScreenResizeDebounce);
      };
    }
  }, []);

  return screenWidth;
}
