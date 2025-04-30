import Container from '@/components/container/Container';
import { Button, Input, TextField } from '@mui/material';

export default function Home() {
  return (
    <>
      <header>
        <Container>
          <div>header</div>
        </Container>
      </header>
      <main>
        <Button variant="contained">Сгенерировать дорожку</Button>
      </main>
    </>
  );
}
