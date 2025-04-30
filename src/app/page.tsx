import Container from '@/components/container/Container';
import { Button, Input, TextField } from '@mui/material';
import Header from '@/components/header/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Button variant="contained">Сгенерировать дорожку</Button>
      </main>
    </>
  );
}
