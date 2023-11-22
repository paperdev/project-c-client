import { iChatData } from '@/shared/interface/chat';
import chatData from './json/chat.json';

const nameSender = 'Anonymous';
const nameAdmin = 'Admin';

let chatList: iChatData[] = chatData;

export {
  chatList,
  nameAdmin,
}