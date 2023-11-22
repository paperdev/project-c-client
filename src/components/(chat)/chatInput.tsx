'use client';

import React, { useEffect, useRef } from 'react';
import { Input, Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

const nameSender = 'Anonymous';

const ScoollHevavior: Record<string, ScrollBehavior> = {
  smooth: 'smooth',
  instant: 'instant',
  auto: 'auto',
}

export default function ComponentChatInput() {
  const inputChatRef = useRef(null);
  const router = useRouter();

  const resetInputChat = () => {
    inputChatRef.current.value = '';
  }

  const checkKeyDown = async (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.code === 'Enter') {
      if (!inputChatRef.current.value) {
        return;
      }

      await sendText(inputChatRef.current.value);

      resetInputChat();
    }
  }

  const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!inputChatRef.current.value) {
      return;
    }
    await sendText(inputChatRef.current.value);

    resetInputChat();
  }

  const sendText = async (text: string) => {
    await fetch(process.env.CHAT_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            avatar: '',
            name: nameSender,
            text: text,
            time: '',
            isSender: true,
          }
        )
      }
    );
    router.refresh();
    scrollToBottom(ScoollHevavior.smooth);
  }

  useEffect(() => {
    scrollToBottom(ScoollHevavior.instant);
  });

  const scrollToBottom = (behavior: ScrollBehavior) => {
    const chatBottomDiv = document.getElementById('chatBottomDiv');
    if (!chatBottomDiv) {
      return;
    }
    chatBottomDiv.scrollIntoView({ behavior: behavior, block: 'end', inline: 'nearest' });
  }

  return (
    <>
      <Input
        autoFocus
        type='text'
        variant='bordered'
        placeholder='Ask me anything'
        endContent={
          <Button
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => { onClick(event); }}
          >
            Send
          </Button>
        }
        ref={inputChatRef}
        onKeyDown={(event: React.KeyboardEvent) => { checkKeyDown(event); }}
      />
    </>
  )
}