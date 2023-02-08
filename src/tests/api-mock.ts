// eslint-disable-next-line import/no-extraneous-dependencies
import { setupServer } from 'msw/node';
// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

const handlers = [
  // @ts-ignore
  rest.post(`${process.env.API_ENDPOINT}/auth/logout`, (req, res, ctx) => {
    console.log('Call logout endpoind');

    return res(ctx.status(200));
  }),
];

export const server = setupServer(...handlers);
