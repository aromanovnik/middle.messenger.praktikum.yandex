import { ChatMessage } from 'api';

export function apiHasMessages(response: any): response is ChatMessage[] {
  return (
    Array.isArray(response) === true &&
    response[0]?.type === ChatMessage.TypeEnum.Message &&
    response
  );
}
