import { setupServer } from 'msw/node';
import { rest } from 'msw';
import mockData from './data';

const server = setupServer(
  rest.get('https://randomuser.me/api/', (req, res, ctx) => {
    return res(ctx.json(mockData));
  })
);

export default server;
