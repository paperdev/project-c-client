'use client';

import { iPost, iComment } from '@/shared/interface/post';
import { LuHeart, LuMessageSquare, LuShare2, LuBookmark } from 'react-icons/lu';
import ComponentComment from '@/components/(post)/comment';
import ComponentPostInput from '@/components/(post)/postInput';
import ComponentPostImage from '@/components/(post)/postImage';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, CardFooter, Chip, Divider } from '@nextui-org/react';

export default function ComponentPost({
  dataPost
}: {
  dataPost: iPost[]
}) {
  const iconWeight = 'w-7';
  const iconHeight = 'h-7';
  const maxNumber = 100;

  const [dataComments, setDataComments] = useState([]);
  const router = useRouter();

  const onClickComment = (event: React.MouseEvent, comments: iComment[]) => {
    const commentsElement = event.currentTarget.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('commentListClass')[0];
    const isHidden = commentsElement.classList.contains('hidden');
    if (isHidden) {
      commentsElement.classList.remove('hidden');
      setDataComments(comments);
    }
    else {
      commentsElement.classList.add('hidden');
    }

    const commentInputElement = commentsElement.getElementsByTagName('input')[0];
    if (commentInputElement) {
      commentInputElement.focus();
    }
  }

  const onClickLike = async (event: React.MouseEvent) => {
    if (!event.currentTarget) {
      return;
    }

    const divLikeButtonAni = event.currentTarget.parentElement.getElementsByClassName('likeButtonAni')[0];
    const postId = event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('data-postid');
    await fetch(process.env.POST_URL + '/' + postId,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            likeCount: 1,
          }
        )
      }
    );

    divLikeButtonAni.classList.remove('invisible');
    divLikeButtonAni.classList.add('animate__animated', 'animate__fadeOutUp');
    divLikeButtonAni.addEventListener('animationend', () => {
      divLikeButtonAni.classList.add('invisible');
      divLikeButtonAni.classList.remove('animate__animated', 'animate__fadeOutUp');
    });

    router.refresh();
  }

  return (
    <div className='flex flex-col gap-1 pt-0.5'>
      {
        dataPost.map((post, index) => {
          return (
            <Card key={index} data-postid={post.id} isBlurred shadow='none' >
              
              <CardHeader>
                <div>
                  <div className='text-2xl font-bold text-primary-500'>{post.title}</div>
                  <span className='text-xs ml-2 text-default-500'>{post.time}</span>
                  <div className='flex mt-2 gap-1'>
                    {
                      post.tags.map((tag, index) => {
                        return <Chip key={index} color='secondary' variant='flat' radius='sm' className='cursor-pointer'>{`#${tag}`}</Chip>
                      })
                    }
                  </div>
                </div>
              </CardHeader>

              <CardBody>
                <ComponentPostImage imgUrls={post.urls}></ComponentPostImage>
              </CardBody>

              <CardFooter className="grid">
                <div className='flex justify-between'>
                  <div className='flex space-x-4'>
                    <LuBookmark className={`${iconHeight} ${iconWeight} text-gray-600 cursor-pointer`}></LuBookmark>
                    <LuShare2 className={`${iconHeight} ${iconWeight} text-gray-600 cursor-pointer`}></LuShare2>
                  </div>

                  <div className='flex space-x-4'>
                    <div className='flex space-x-1 items-center'>
                      <LuMessageSquare onClick={(event: React.MouseEvent) => { onClickComment(event, post.comments); }} className={`${iconHeight} ${iconWeight} text-gray-600 cursor-pointer`}></LuMessageSquare>
                      <div>{(maxNumber < post.comments.length ? `${maxNumber}+` : `${post.comments.length}`)}</div>
                    </div>

                    <div className='flex space-x-1 items-center'>
                      <div className='flex relative'>
                        <LuHeart onClick={(event: React.MouseEvent) => { onClickLike(event); }} className={`${iconHeight} ${iconWeight} text-gray-600 cursor-pointer fill-red-500`}></LuHeart>
                        <div>{(maxNumber < post.likeCount ? `${maxNumber}+` : `${post.likeCount}`)}</div>

                        <div className='flex absolute invisible likeButtonAni'>
                          <LuHeart className={`${iconHeight} ${iconWeight} text-gray-600 cursor-pointer fill-red-500`}></LuHeart>
                          <div>+1</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='hidden p-6 commentListClass'>
                  <ComponentComment postId={post.id} dataComments={dataComments}></ComponentComment>
                </div>
              </CardFooter>

              {
                index !== (dataPost.length - 1) && <Divider className="my-2" />
              }

            </Card>
          )
        })
      }
      <ComponentPostInput />
    </div>
  )
}
