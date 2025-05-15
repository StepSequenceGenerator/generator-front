import { useEffect, useState } from 'react';

function getScreenSize() {
  return window.innerWidth;
}

export function useScreenResizeListener() {
  const [screenWidth, setScreenWidth] = useState(getScreenSize());

  function listenScreenResize() {
    const width = getScreenSize();
    setScreenWidth(width);
  }

  useEffect(() => {
    setScreenWidth(getScreenSize());
    window.addEventListener('resize', listenScreenResize);
    return () => {
      window.removeEventListener('resize', listenScreenResize);
    };
  }, []);

  return screenWidth;
}
