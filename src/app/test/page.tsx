'use client';
import styles from '@/components/track-2d/track-2d.module.scss';
import { useFabricCanvasTest } from '@/hooks/use-fabric-canvas/useFabricCansvasTest';

export default function PageTest() {
  const canvasRef = useFabricCanvasTest();
  const event = new CustomEvent('rerender', { bubbles: true });

  const onClick = () => {
    document.dispatchEvent(event);
  };

  return (
    <>
      <h2>Test</h2>
      <br />
      <button onClick={onClick}>Rerender</button>
      <br />
      <br />
      <div className={styles.canvasContainer}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </>
  );
}
