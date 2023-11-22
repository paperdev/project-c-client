'use client';

import React from 'react';
import {Card, CardBody, Image} from '@nextui-org/react';

export default function ComponentPostImage({
  imgUrls
}: {
  imgUrls: string[]
}) {
  const onPress = () => {}
  const fallbackSrc = 'https://via.placeholder.com/672x480';

  return (
    <>
      {
        1 === imgUrls.length
          ?
          <>
            <Card shadow='none' isPressable onPress={onPress}>
              <CardBody className='overflow-visible p-0'>
                <Image
                  radius='md'
                  src={imgUrls[0]}
                  fallbackSrc={fallbackSrc}
                />
              </CardBody>
            </Card>
          </>
          :
          <>
            <div className='gap-0.5 grid grid-cols-1 sm:grid-cols-3'>
              {imgUrls.map((url, index) => (
                <Card shadow='none' key={index} isPressable onPress={onPress}>
                  <CardBody className='overflow-visible p-0'>
                    <Image
                      radius='md'
                      src={url}
                      fallbackSrc={fallbackSrc}
                    />
                  </CardBody>
                </Card>
              ))}
            </div>
          </>
      }
    </>
  )
}
