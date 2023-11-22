'use client';

import { usePathname } from 'next/navigation';
import ComponentChatInput from '@/components/(chat)/chatInput';

const URL_CHAT = '/chat';

export default function Footer() {
  const currentUrl = usePathname();

  return (
    <>
      {
        currentUrl === URL_CHAT && <ComponentChatInput />
      }
    </>
  );
}
