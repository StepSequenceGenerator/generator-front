import Container from '@/components/ui/container/Container';
import { Button, Input, TextField } from '@mui/material';
import Header from '@/components/header/Header';
import Main from '@/components/ui/main/Main';
import TextScreen from '@/components/text-screen/TextScreen';

export default function Home() {
  return (
    <>
      <Header />
      <Main>
        <Container>
          <Button variant="contained">Сгенерировать дорожку</Button>
          <TextScreen />
        </Container>
      </Main>
    </>
  );
}
