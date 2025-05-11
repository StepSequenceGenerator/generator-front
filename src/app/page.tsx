'use client';

import Container from '@/components/ui/container/Container';
import { Button, Input, TextField } from '@mui/material';
import Header from '@/components/header/Header';
import Main from '@/components/ui/main/Main';
import TextScreen from '@/components/text-screen/TextScreen';
import { getStepSequence } from '@/connections/sg-api';
import { useState } from 'react';
import { apiStepSequenceType } from '@/types/step-sequence-type';

export default function Home() {
  const [sequence, setSequence] = useState<apiStepSequenceType[]>([]);

  const onGetSequence = async () => {
    const sequence = await getStepSequence();
    setSequence(sequence.data);
  };

  return (
    <>
      <Header />
      <Main>
        <Container>
          <Button variant="contained" onClick={onGetSequence}>
            Сгенерировать дорожку
          </Button>
          <TextScreen sequence={sequence} />
        </Container>
      </Main>
    </>
  );
}
