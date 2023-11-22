'use client';

import React, { useState } from 'react';
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { LuLink, LuUnlink, LuMessagesSquare, LuAperture } from 'react-icons/lu';
import { usePathname, useRouter } from 'next/navigation';
import { iProfile } from '@/shared/interface/profile';

const URL_PROFILE = '/home';
const URL_CHAT = '/chat';
const URL_POST = '/post';

export default function ProfileAvatar({
  isGuest,
  dataProfile
}: {
  isGuest: boolean,
  dataProfile: iProfile,
}) {
  const [isFollowed, setIsFollowed] = useState(false);
  const router = useRouter();
  const currentUrl = usePathname();

  const onClickProfile = () => {
    router.push(URL_PROFILE);
  }
  
  const onClickFollow = () => {
    setIsFollowed(!isFollowed);
    isFollowed ? dataProfile.followers++ : dataProfile.followers--;
  }

  const onClickMessage = () => {
    if (URL_CHAT === currentUrl) {
      router.push(URL_POST);
    }
    else if (URL_POST === currentUrl) {
      router.push(URL_CHAT);
    }
  }

  return (
    <Card shadow='none' className='max-w-[300px] border-none bg-transparent'>
      <CardHeader className='justify-between'>
        <div className='flex gap-3'>
          <Avatar isBordered color={dataProfile.isOnline ? 'secondary' : 'default'} radius='full' size='sm' src={dataProfile.avatar} className='cursor-pointer' onClick={onClickProfile} />
          <div className='flex flex-col items-start justify-center'>
            <h4 className='text-small font-semibold leading-none text-default-600'>{dataProfile.name}</h4>
            <h5 className='text-small tracking-tight text-default-500'>{dataProfile.email}</h5>
          </div>
        </div>
        {
          !isGuest
          &&
          <Button
            isIconOnly
            className={`ml-2 ${isFollowed ? 'bg-transparent text-foreground border-default-200' : ''}`}
            color='primary'
            radius='full'
            size='sm'
            variant={isFollowed ? 'bordered' : 'solid'}
            onPress={onClickFollow}
          >
            {isFollowed ? <LuUnlink className='w-5 h-5' /> : <LuLink className='w-5 h-5' />}
          </Button>
        }
        
      </CardHeader>
      <CardBody className='px-3 py-0'>
        <div className='text-small pl-px text-default-500'>
          {dataProfile.jobTitle}
          <span aria-label='confetti' role='img'>
            🎉🎉🎉
          </span>
        </div>
      </CardBody>
      <CardFooter className='gap-3'>
        <div className='flex gap-1'>
          <div className='font-semibold text-default-600 text-small'>{dataProfile.following}</div>
          <div className=' text-default-500 text-small'>Following</div>
        </div>
        <div className='flex gap-1'>
          <div className='font-semibold text-default-600 text-small'>{dataProfile.followers}</div>
          <div className='text-default-500 text-small'>Followers</div>
        </div>
        {
          !isGuest
          &&
          <>
          {(() => {
            if (URL_CHAT === currentUrl) {
              return (
                <Button
                  color='success'
                  radius='full'
                  size='sm'
                  variant='light'
                  onPress={onClickMessage}
                  startContent={
                    <LuAperture className='w-6 h-6' />
                  }
                >
                  <div className='text-base'>Post</div>
                </Button>
              )
            } else if (URL_POST === currentUrl) {
              return (
                <Button
                  color='success'
                  radius='full'
                  size='sm'
                  variant='light'
                  onPress={onClickMessage}
                  startContent={
                    <LuMessagesSquare className='w-6 h-6' />
                  }
                >
                  <div className='text-base'>Chat</div>
                </Button>
              )
            } else {
              return (
                <></>
              )
            }
          })()}
          </>
        }
        
      </CardFooter>
    </Card>
  );
};
