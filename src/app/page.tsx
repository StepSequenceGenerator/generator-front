'use client'
import Container from '@/components/ui/container/Container';
import { Button, Input, TextField } from '@mui/material';
import Header from '@/components/header/Header';
import Main from '@/components/ui/main/Main';
import TextScreen from '@/components/text-screen/TextScreen';
import { sgApi } from '@/api/sequence-generator/methods-sg-api';

export default function Home() {
  const [stepSequence, setStepSequence] = useState<Movement[]>([]);

   async function onGetSequence () {
    const response = await sgApi.getStepSequence();
    setStepSequence(response.data);
  }
  return (
    <>
      <Header />
      <Main>
        <Container>
          <Button variant="contained" onClick={onGetSequence}>Сгенерировать дорожку</Button>
          <TextScreen />
        </Container>
      </Main>
    </>
  );
}
