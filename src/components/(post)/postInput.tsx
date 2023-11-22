'use client';

import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from '@nextui-org/react';
import { LuPlus } from 'react-icons/lu';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function ComponentPostInput({
}: {
  }) {
  const iconWeight = 'w-7';
  const iconHeight = 'h-7';

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const inputMessagesRef = useRef(null);
  const inputTagsRef = useRef(null);
  const inputFilesRef = useRef(null);
  const router = useRouter();

  const onClickNewPost = () => {    
    if (!inputMessagesRef.current.value && !inputTagsRef.current.value && !inputFilesRef.current.value) {
      return;
    }

    sendPost(inputMessagesRef.current.value, [inputTagsRef.current.value], [inputFilesRef.current.value]);
  }

  const sendPost = async (inputMessages: string, inputTags: string[], inputFiles: string[]) => {
    await fetch(process.env.POST_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            title: inputMessages,
            tags: inputTags,
            urls: inputFiles
          }
        )
      }
    );
    router.refresh();
  }

  return (
    <>
      <Button onPress={onOpen} isIconOnly color='primary' className='sticky ml-auto bottom-5 right-5'>
        <LuPlus className={`${iconHeight} ${iconWeight}`}></LuPlus>
      </Button>

      <Modal
        backdrop='blur'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='top-center'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>New Post</ModalHeader>

              <ModalBody>
                <Input
                  autoFocus
                  ref={inputMessagesRef}
                  type='text'
                  placeholder='Input some messages'
                  variant='underlined'
                />
                <Input
                  ref={inputTagsRef}
                  type='text'
                  placeholder='Input some tags'
                  variant='underlined'
                />
                <Input
                  ref={inputFilesRef}
                  type='file'
                  variant='underlined'
                />
              </ModalBody>

              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={onClose} onClick={onClickNewPost}>
                  Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
