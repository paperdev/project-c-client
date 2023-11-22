import ComponentChatData from '@/components/(chat)/chatData';
import { iChatData } from '@/shared/interface/chat';

async function getChatList() {
  const res = await fetch(
    process.env.CHAT_URL,
    {
      headers: {
        'Content-type': 'application/json;',
      },
      cache: 'no-cache'
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
      {
        chatList.map((chatData: iChatData, index: number) => {
          return (
            <ComponentChatData key={index} chatData={chatData} />
          )
        })
      }
    </>
  )
}