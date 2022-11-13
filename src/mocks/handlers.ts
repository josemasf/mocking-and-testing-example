import { rest } from "msw";
import mockServer from "../../db/customers.json";

const mockData = mockServer.data;

const handlers = [
  rest.get(`${import.meta.env.VITE_API_URL}/data`, (req, res, context) => {
    return res(context.status(200), context.json(mockData));
  }),
];

export { handlers, rest, mockData };
