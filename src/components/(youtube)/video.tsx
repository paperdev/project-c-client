'use client';

import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Chip } from '@nextui-org/react';
import { LuHeart, LuMessageSquare, LuEye, LuBookmark, LuYoutube } from 'react-icons/lu';
import ComponentThumbnail from '@/components/(youtube)/thumbnail';

const URL_CHANNEL = 'https://www.youtube.com/channel/'
const URL_VIDEO = 'https://www.youtube.com/watch?v='

export default function ComponentVideo({
  dataVideo
}: {
  dataVideo: any[]
}) {
  const iconWeight = 'w-7';
  const iconHeight = 'h-7';

  const onClickYoutube = async (event: React.MouseEvent) => {
    if (!event.currentTarget) {
      return;
    }

    // const videoId = event.currentTarget.getAttribute('data-vidoeid');
  }

  return (
    <div className='flex flex-col gap-1 pt-0.5'>
      {
        dataVideo.map((video, index) => {
          return (
            <Card key={index} isBlurred shadow='none' >
              <CardHeader>
                <div>
                  <div className='text-2xl font-bold text-primary-500'>{video.snippet.title}</div>
                  <span className='text-xs ml-2 text-default-500'>{video.snippet.publishedAt}</span>
                  <div className='flex mt-2 gap-1 flex-wrap mx-auto'>
                    {
                      video.snippet.tags && 
                      video.snippet.tags.map((tag: string, index: number) => {
                        return <Chip key={index} color='secondary' variant='flat' radius='sm' className='cursor-pointer'>{`#${tag}`}</Chip>
                      })
                    }
                  </div>
                  <div className='flex mt-2 gap-1'>
                    <div className='text-primary-500'>Channel : </div>
                    <Link isExternal showAnchorIcon href={URL_CHANNEL + video.snippet.channelId}>
                      {video.snippet.channelTitle}
                    </Link>
                  </div>

                </div>
              </CardHeader>

              <CardBody>
                <ComponentThumbnail dataThumbnail={video.snippet.thumbnails.standard} videoId={video.id}></ComponentThumbnail>
              </CardBody>

              <CardFooter className="grid">
                <div className='flex justify-between'>

                  <div className='flex gap-4 ml-2'>
                    <div className='flex gap-2 items-center text-gray-600'>
                      <LuHeart className={`${iconHeight} ${iconWeight} cursor-pointer`}></LuHeart>
                      <div>{video.statistics.likeCount}</div>
                    </div>

                    <div className='flex gap-2 items-center text-gray-600'>
                      <LuEye className={`${iconHeight} ${iconWeight} cursor-pointer`}></LuEye>
                      <div>{video.statistics.viewCount}</div>
                    </div>

                    <div className='flex gap-2 items-center text-gray-600'>
                      <LuMessageSquare className={`${iconHeight} ${iconWeight} cursor-pointer`}></LuMessageSquare>
                      <div>{video.statistics.commentCount}</div>
                    </div>

                    <div className='flex gap-2 items-center text-gray-600'>
                      <LuBookmark className={`${iconHeight} ${iconWeight} cursor-pointer`}></LuBookmark>
                      <div>{video.statistics.favoriteCount}</div>
                    </div>
                  </div>

                  <div className='mr-2'>
                    <Link isExternal href={URL_VIDEO + video.id}>
                      <LuYoutube data-vidoeid={video.id} className={`${iconHeight} ${iconWeight} text-gray-600 cursor-pointer`} onClick={(event: React.MouseEvent) => { onClickYoutube(event); }}></LuYoutube>
                    </Link>
                  </div>

                </div>


              </CardFooter>

              <Divider className="my-2" />
            </Card>
          )
        })
      }
    </div>
  )
}
