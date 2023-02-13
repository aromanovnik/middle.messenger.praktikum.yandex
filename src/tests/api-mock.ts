// eslint-disable-next-line import/no-extraneous-dependencies
import { setupServer } from 'msw/node';
// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { config } from '../config';

const handlers = [
  // @ts-ignore
  rest.post(`${config.api}/auth/logout`, (req, res, ctx) => {
    console.log('Call logout endpoind');

    return res(ctx.status(200));
  }),
];

export const server = setupServer(...handlers);
