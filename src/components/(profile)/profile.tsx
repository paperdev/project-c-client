'use client';

import React, { useState } from 'react';
import { Avatar, Link } from '@nextui-org/react';
import { LuGithub, LuMail, LuLinkedin } from 'react-icons/lu';
import { iProfile } from '@/shared/interface/profile';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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
  }

  const onClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);
  };

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

            <div className='flex cursor-pointer text-primary-500 mt-2' onClick={() => { copyText(dataProfile.email) }}>
              <div className='flex space-x-2'>
                <LuMail className='w-6 h-6' />
                <div>{dataProfile.email}</div>
              </div>

              <Snackbar
                open={isOpen}
                autoHideDuration={delayTime}
                onClose={onClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              >
                <Alert onClose={onClose} severity='success' variant='filled' >
                  Email is copied!
                </Alert>
              </Snackbar>
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

              {/* <div className='cursor-pointer text-secondary' onClick={() => { copyText(dataProfile.email) }}>
                <LuMail className='w-6 h-6' />
              </div>
              <Snackbar
                open={isOpen}
                autoHideDuration={delayTime}
                onClose={onClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              >
                <Alert onClose={onClose} severity='success' variant='filled' >
                  Email is copied!
                </Alert>
              </Snackbar> */}

            </div>

          </div>
        </div>
      </div>
    </>
  )
}