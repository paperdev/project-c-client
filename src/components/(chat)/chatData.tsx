'use client';

import React from 'react';
import { Input, Avatar, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
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

export default function ComponentChatData({
  chatData
}: {
  chatData: iChatData,
}) {
  const chatPosition = chatData.isSender ? 'justify-end' : 'justify-start';
  chatData.avatar = chatData.isSender ? '' : dataProfile.profile.avatar;
  chatData.name = chatData.isSender ? '' : dataProfile.profile.name;

  return (
    <div className={`flex ${chatPosition}`}>
      <div className='mt-7'>
        <Popover showArrow placement='top-start'>
          <PopoverTrigger>
            <Avatar
              radius='full'
              size='sm'
              showFallback
              src={chatData.avatar}
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
          label={chatData.name}
          labelPlacement='outside'
          isReadOnly
          value={chatData.text}
          description={chatData.time}
        />
      </div>
    </div>
  )
}