import { ChatMessage } from 'api';

export function apiHasMessage(response: any): response is ChatMessage {
  return response?.type === ChatMessage.TypeEnum.Message && response;
}
