import 'regenerator-runtime/runtime';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'whatwg-fetch';
import { server } from './api-mock';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
