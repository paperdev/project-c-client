'use client';

import React from 'react';
import { Card, CardBody, Image, Link } from '@nextui-org/react';

const URL_VIDEO = 'https://www.youtube.com/watch?v='

export default function ComponentThumbnail({
  dataThumbnail,
  videoId: videoId
}: {
  dataThumbnail: {
    url: string,
    width: string,
    height: string
  },
  videoId: string
}) {
  const onPress = () => { }
  const fallbackSrc = `https://via.placeholder.com/${dataThumbnail.width}x${dataThumbnail.height}`;

  return (
    <>
      <Card shadow='none' isPressable onPress={onPress} className='mx-auto'>
        <CardBody className='overflow-visible p-0'>
          <Link isExternal href={URL_VIDEO + videoId}>
            <Image
              radius='md'
              src={dataThumbnail.url}
              fallbackSrc={fallbackSrc}
            />
          </Link>
        </CardBody>
      </Card>
    </>
  )
}
