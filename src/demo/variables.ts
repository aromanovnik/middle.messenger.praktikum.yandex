import { ChatMessage, ChatsResponse, UserResponse } from './types';

// User
export const userInfo: UserResponse = {
  id: 1,
  avatar: '',
  firstName: 'Иван',
  secondName: 'Иванов',
  login: 'Ivashka',
  email: 'Ivashka@mail.com',
  displayName: 'Иван',
  phone: '88009001020',
};

// Chats
export const chat: ChatsResponse = {
  id: 123,
  title: 'my-chat',
  avatar: '',
  unreadCount: 15,
  lastMessage: {
    user: userInfo,
    time: '2020-01-02T14:22:22.000Z',
    content: 'this is message content',
  },
};

export const chats: ChatsResponse[] = [
  chat,
  {
    ...chat,
    id: 124,
    unreadCount: 0,
    lastMessage: {
      ...chat.lastMessage,
      user: {
        ...userInfo,
        id: 3,
      },
      content: 'this is message content 4',
    },
  },
  {
    ...chat,
    id: 125,
  },
  {
    ...chat,
    id: 126,
    unreadCount: 0,
    lastMessage: {
      ...chat.lastMessage,
      user: {
        ...userInfo,
        id: 2,
      },
      content: 'this is message content 2',
    },
  },
];

// Messages
export const message: ChatMessage = {
  id: 1,
  userId: 1,
  chatId: 125,
  time: new Date(),
  type: ChatMessage.TypeEnum.Message,
  content: 'This is a message',
};

export const messages: ChatMessage[] = [
  message,
  {
    ...message,
    id: 3,
    userId: 3,
  },
];
