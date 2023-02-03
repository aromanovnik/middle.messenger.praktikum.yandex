import { BadRequestError } from 'api';

export function apiHasError(response: any): response is BadRequestError {
  return response && response.reason;
}
