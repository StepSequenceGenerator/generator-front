import style from './text-screen.module.scss';
import { apiStepSequenceType } from '@/types/step-sequence-type';

type TextScreenProps = {
  sequence: apiStepSequenceType[];
};

export default function TextScreen(props: TextScreenProps) {
  const { sequence } = props;
  return (
    <div className={style.textScreen}>
      <ul>
        {sequence.map((item, i) => (
          <li>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
// 4175fd
