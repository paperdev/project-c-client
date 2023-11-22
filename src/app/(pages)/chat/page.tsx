import ComponentChatData from '@/components/(chat)/chatData';
import { iChatData } from '@/shared/interface/chat';

async function getChatList() {
  const res = await fetch(
    process.env.CHAT_URL,
    {
      headers: {
        'Content-type': 'application/json;',
      },
    }
  );
 
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
 
  return res.json();
}

export default async function Page() {
  const chatList = await getChatList();

  return(
    <>
      <ComponentChatData chatList={chatList} />
    </>
  )
}