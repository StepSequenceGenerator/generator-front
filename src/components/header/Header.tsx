import Container from '@/components/ui/container/Container';
import Image from 'next/image';
import style from './header.module.scss';
import Person2Rounded from '@mui/icons-material/Person2Rounded';
import generatorIcon from '@/assets/img/gen-icon.png';

export default function Header() {
  return (
    <header className={style.header}>
      <Container>
        <div className={style.headerContainer}>
          <Image src={generatorIcon} alt="icon" width="50" height="50" />
          <div>
            <Person2Rounded fontSize="large" />
          </div>
        </div>
      </Container>
    </header>
  );
}
