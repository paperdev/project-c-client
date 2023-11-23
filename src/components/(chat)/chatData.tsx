'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Avatar, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { iChatData } from '@/shared/interface/chat';
import ProfileAvatar from '@/components/(profile)/profileAvatar';
import dataProfile from '@/shared/data/json/profile.json'; // TODO:
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const guestProfile = {
  'name': 'Guest',
  'avatar': '',
  'jobTitle': 'I am a guest',
  'github': '',
  'linkedin': '',
  'email': 'Unknown',
  'following': 0,
  'followers': 0,
  'isOnline': false
}

const ScoollHevavior: Record<string, ScrollBehavior> = {
  smooth: 'smooth',
  instant: 'instant',
  auto: 'auto',
}

export default function ComponentChatData({
  chatList
}: {
  chatList: iChatData[],
}) {
  const [recentChatList, setRecentChatList] = useState(chatList);
  const inputChatRef = useRef(null);
  const chatListRef = useRef(null);

  const resetInputChat = () => {
    inputChatRef.current.value = '';
  }

  useEffect(() => {
    scrollToBottom(ScoollHevavior.instant);
  }, [recentChatList.length]);

  const scrollToBottom = (behavior: ScrollBehavior) => {
    if (!chatListRef.current) {
      return;
    }
    chatListRef.current.scrollIntoView({ behavior: behavior, block: 'end', inline: 'nearest' });
  }

  const scrollToTop = (behavior: ScrollBehavior) => {
    if (!chatListRef.current) {
      return;
    }
    chatListRef.current.scrollIntoView({ behavior: behavior, block: 'start', inline: 'nearest' });
  }

  const checkKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.code === 'Enter') {
      if (!inputChatRef.current.value) {
        return;
      }

      sendText(inputChatRef.current.value);
    }
  }

  const onPressSend = () => {
    if (!inputChatRef.current.value) {
      return;
    }
    sendText(inputChatRef.current.value);
  }

  const sendText = async (text: string) => {
    const sendBody: iChatData = {
      avatar: guestProfile.avatar,
      name: guestProfile.name,
      text: text,
      time: '',
      isSender: true,
    };
    const res = await fetch(process.env.CHAT_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendBody)
      }
    );

    const resBody: iChatData = await res.json();
    setRecentChatList(recentChatList.concat([sendBody, resBody]));
    resetInputChat();
  }

  return (
    <>
      <List>
        {
          recentChatList.map((chatData: iChatData, index: number) => {
            return (
              <ListItem
                key={index}
                className={`flex ${chatData.isSender ? 'justify-end' : 'justify-start'} gap-2`}
              >
                <div>
                  <Popover showArrow placement='top-start'>
                    <PopoverTrigger>
                      <Avatar
                        radius='full'
                        size='sm'
                        showFallback
                        src={chatData.isSender ? chatData.avatar : dataProfile.profile.avatar}
                        className={`cursor-pointer`}
                      >
                      </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className='p-1'>
                      <ProfileAvatar isGuest={chatData.isSender} dataProfile={chatData.isSender ? guestProfile : dataProfile.profile} />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Input
                    label={chatData.name}
                    labelPlacement='outside'
                    isReadOnly
                    value={chatData.text}
                    description={chatData.time}
                  />
                </div>
              </ListItem>
            )
          })
        }
      </List>

      <div className='sticky bottom-0 bg-background backdrop-blur-0 z-30'>
        <Input
          autoFocus
          type='text'
          variant='bordered'
          placeholder='Ask me anything'
          endContent={
            <Button
              onPress={() => { onPressSend(); }}
            >
              Send
            </Button>
          }
          ref={inputChatRef}
          onKeyDown={(event: React.KeyboardEvent) => { checkKeyDown(event); }}
        />
      </div>

      <div ref={chatListRef}></div>
    </>
  )
}
