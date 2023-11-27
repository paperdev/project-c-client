'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Input, Avatar, Popover, PopoverTrigger, PopoverContent, Button, Listbox, ListboxItem, Textarea, Spinner } from '@nextui-org/react';
import { iChatData } from '@/shared/interface/chat';
import ProfileAvatar from '@/components/(profile)/profileAvatar';
import dataProfile from '@/shared/data/json/profile.json'; // TODO:

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
  const [isLoading, setIsLoading] = useState(false);
  const inputChatRef = useRef(null);
  const chatListBottomRef = useRef(null);
  const chatListTopRef = useRef(null);

  const resetInputChat = () => {
    inputChatRef.current.value = '';
  }

  useEffect(() => {
    if (2 >= recentChatList.length) {
      scrollToTop(ScoollHevavior.instant);
    }
    else {
      scrollToBottom(ScoollHevavior.instant);
    }
  }, [recentChatList.length]);

  const scrollToBottom = (behavior: ScrollBehavior) => {
    if (!chatListBottomRef.current) {
      return;
    }
    chatListBottomRef.current.scrollIntoView({ behavior: behavior, block: 'end', inline: 'nearest' });
  }

  const scrollToTop = (behavior: ScrollBehavior) => {
    if (!chatListTopRef.current) {
      return;
    }
    chatListTopRef.current.scrollIntoView({ behavior: behavior, block: 'start', inline: 'nearest' });
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
    if (isLoading) {
      return;
    }

    resetInputChat();

    const sendBody: iChatData = {
      avatar: guestProfile.avatar,
      name: guestProfile.name,
      text: text,
      time: '',
      isSender: true,
    };
    let newChatList = recentChatList.concat([sendBody]);
    setRecentChatList(newChatList);
    setIsLoading(true);


    const loadingBody: iChatData = {
      avatar: dataProfile.profile.avatar,
      name: dataProfile.profile.name,
      text: text,
      time: '',
      isSender: false,
    };

    setRecentChatList([...newChatList, loadingBody]);

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
    newChatList = newChatList.concat([resBody]);
    setRecentChatList(newChatList);
    setIsLoading(false);
  }

  return (
    <>
      <div ref={chatListTopRef}></div>
      <Listbox
        className='min-h-screen'
        variant='light'
        aria-label='chatListBox'
      >
        {
          recentChatList.map((chatData: iChatData, index: number) => {
            return (
              <ListboxItem
                key={index}
                textValue={index.toString()}
              >
                <div className={`flex items-center ${chatData.isSender ? 'justify-end' : 'justify-start'} gap-2`}>

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

                  {
                    isLoading && !chatData.isSender && (index === recentChatList.length - 1)
                      ? <Spinner size="md" />
                      :
                      <div className='w-1/2'>
                        <Textarea
                          minRows={1}
                          label={chatData.name}
                          labelPlacement='outside'
                          isReadOnly
                          value={chatData.text}
                          description={chatData.time}
                        />
                      </div>
                  }
                </div>
              </ListboxItem>

            )
          })
        }
      </Listbox>

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

      <div ref={chatListBottomRef} className='invisible'></div>
    </>
  )
}