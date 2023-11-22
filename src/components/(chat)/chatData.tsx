'use client';

import React, { useState, useEffect } from 'react';
import { Input, Avatar, Popover, PopoverTrigger, PopoverContent, ScrollShadow } from '@nextui-org/react';
import { iChatData } from '@/shared/interface/chat';
import ComponentChatInput from '@/components/(chat)/chatInput';
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

export default function ComponentChatData({
  chatList
}: {
  chatList: iChatData[],
}) {
  const [recentChat, setRecentChat] = useState(chatList);

  useEffect(() => {
    setRecentChat(chatList);
  }, [chatList]);

  return (
    <>
      <ScrollShadow hideScrollBar className='h-screen'>
        {
          recentChat.map((chatData: iChatData, index: number) => {
            return (
              <div key={index} className={`flex ${chatData.isSender ? 'justify-end' : 'justify-start'}`}>
                <div className='mt-7'>
                  <Popover showArrow placement='top-start'>
                    <PopoverTrigger>
                      <Avatar
                        radius='full'
                        size='sm'
                        showFallback
                        src={chatData.isSender ? '' : dataProfile.profile.avatar}
                        className={`cursor-pointer`}
                      >
                      </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className='p-1'>
                      <ProfileAvatar isGuest={chatData.isSender} dataProfile={chatData.isSender ? guestProfile : dataProfile.profile} />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className='ml-1'>
                  <Input
                    label={chatData.isSender ? '' : dataProfile.profile.name}
                    labelPlacement='outside'
                    isReadOnly
                    value={chatData.text}
                    description={chatData.time}
                  />
                </div>
              </div>
            )
          })
        }
      </ScrollShadow>

      <div className='sticky bottom-0 bg-background'>
        <ComponentChatInput />
      </div>
    </>
  )
}