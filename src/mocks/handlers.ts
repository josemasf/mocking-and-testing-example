import { rest } from "msw";
import mockServer from "../../db/customers.json";

const handlers = [
  rest.get(`${import.meta.env.VITE_API_URL}/data`, (req, res, context) => {
    return res(context.status(200), context.json(mockServer.data));
  }),
];

export { handlers, rest };
