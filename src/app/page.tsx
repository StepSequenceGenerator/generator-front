'use client';
import Container from '@/components/ui/container/Container';
import { Button, Input, TextField } from '@mui/material';
import Header from '@/components/header/Header';
import Main from '@/components/ui/main/Main';
import TextScreen from '@/components/text-screen/TextScreen';
import { sgApi } from '@/api/sequence-generator/methods-sg-api';
import { useState } from 'react';
import type { Movement } from '@/types/sg-api/response-types';
import Track2D from '@/components/track-2d/Track2D';
import BaseContentContainer from '@/components/ui/base-content-container/BaseContentContainer';

export default function Home() {
  const [stepSequence, setStepSequence] = useState<Movement[]>([]);

  async function onGetSequence() {
    const response = await sgApi.getStepSequence();
    setStepSequence(response.data);
  }

  function getTest() {
    const data = sgApi.test();
    setStepSequence(data);
  }
  return (
    <>
      <Header />
      <Main>
        <Container>
          <Button variant="contained" onClick={getTest}>
            Сгенерировать дорожку
          </Button>
          <BaseContentContainer>
            <TextScreen stepSequence={stepSequence} />
            <Track2D movements={stepSequence} />
          </BaseContentContainer>
        </Container>
      </Main>
    </>
  );
}
