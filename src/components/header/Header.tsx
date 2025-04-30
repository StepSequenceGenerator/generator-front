import Container from '@/components/container/Container';
import headerStyle from './header.module.scss';
import generatorIcon from '@/assets/img/gen-icon.png';
import Image from 'next/image';
import Person2Rounded from '@mui/icons-material/Person2Rounded';

export default function Header() {
  return (
    <header className="header">
      <Container>
        <div className={headerStyle.headerContainer}>
          <Image src={generatorIcon} alt="icon" width="50" height="50" />
          <div>
            <Person2Rounded fontSize="large" />
          </div>
        </div>
      </Container>
    </header>
  );
}
