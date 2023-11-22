'use client';

import React from 'react';
import { Chip } from '@nextui-org/react';
import { iTag } from '@/shared/interface/tag';

export default function ComponentTag({
  dataTags
}: {
  dataTags: iTag[],
}) {
  return (
    <>
      <div className='flex justify-center items-center flex-wrap mx-auto'>
        {
          dataTags.map((tag: iTag, index) => {
            return <Chip key={index} color='secondary' variant='light'>{`#${tag.name}`}</Chip>
          })
        }
      </div>
    </>
  )
}