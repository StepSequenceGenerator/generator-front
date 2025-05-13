import useFabricCanvas from '@/hooks/use-fabric-canvas/useFabricCanvas';
import { Movement } from '@/shared/types/sg-api/response-types';
import styles from './track-2d.module.scss';

type Track2DProps = {
  movements: Movement[];
};

export default function Track2D(props: Track2DProps) {
  const { movements } = props;
  const canvasRef = useFabricCanvas(movements);
  return (
    <div className={styles.canvasContainer}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
