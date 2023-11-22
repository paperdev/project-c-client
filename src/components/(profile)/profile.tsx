'use client';

import React, { useState } from 'react';
import { Avatar, Link, Button, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';
import { LuGithub, LuMail, LuLinkedin } from 'react-icons/lu';
import { iProfile } from '@/shared/interface/profile';
import 'react-toastify/dist/ReactToastify.css';

export default function ComponentProfile({
  dataProfile
}: {
  dataProfile: iProfile
}) {
  const delayTime = 2000;
  const [isOpen, setIsOpen] = useState(false);

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
  
    if (isOpen) {
      return;
    }

    setIsOpen(true);

    setTimeout(() => {
      setIsOpen(false);
    }, delayTime)
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center text-center sm:flex sm:flex-row sm:justify-center sm:items-center sm:text-left sm:py-4 mx-auto'>
        <Avatar src={dataProfile.avatar} className='w-24 h-24'></Avatar>

        <div className='sm:pl-4'>
          <div className='py-2'>
            <div className='text-primary-500 text-lg font-semibold'>
              {dataProfile.name}
            </div>

            <div className='font-medium text-default-500'>
              {dataProfile.jobTitle}
            </div>

            <div className='flex gap-2 mt-2 justify-center sm:justify-start'>
              <Link
                showAnchorIcon
                href={dataProfile.github}
                isExternal
                color='secondary'
                anchorIcon={
                  <LuGithub className='w-6 h-6' />
                }
              >
              </Link>

              <Link
                showAnchorIcon
                href={dataProfile.linkedin}
                isExternal
                color='secondary'
                anchorIcon={
                  <LuLinkedin className='w-6 h-6' />
                }
              >
              </Link>

              <Popover placement='right' color='success' showArrow={true} isOpen={isOpen} >
                <PopoverTrigger>
                  <div className='cursor-pointer text-secondary' onClick={() => { copyText(dataProfile.email) }}>
                    <LuMail className='w-6 h-6' />
                  </div>
                  
                </PopoverTrigger>
                <PopoverContent>
                  {
                    isOpen && 
                      <div className='p-1 text-secondary-500 text-md'>Email is copied!</div>
                  }
                </PopoverContent>
              </Popover>
            </div>

            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  )
}