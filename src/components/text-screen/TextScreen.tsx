import style from './text-screen.module.scss';
import { Movement } from '@/types/sg-api/response-types';

type TextScreenProps = {
  stepSequence: Movement[];
};

export default function TextScreen(props: TextScreenProps) {
  const { stepSequence } = props;

  if (stepSequence.length === 0) return <div></div>;
  return (
    <div className={style.textScreen}>
      <ol>
        {stepSequence.map((item) => (
          <li key={item.id}>
            {item.name}: {item.type.toUpperCase()}
          </li>
        ))}
      </ol>
    </div>
  );
}
// 4175fd
