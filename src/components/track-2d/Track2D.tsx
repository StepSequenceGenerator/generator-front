
import useFabricCanvas from '@/hooks/useFabricCanvas';
import { Movement } from '@/types/sg-api/response-types';

type Track2DProps = {
  movements: Movement[]
}

export default function Track2D(props: Track2DProps) {
const { movements} = props;
  const canvasRef =  useFabricCanvas(movements);
  return (
    <div className="track-container">
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}