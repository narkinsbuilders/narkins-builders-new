import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '53e7f313a01bc4bebc89cfd2ca0033b8413875f7', queries,  });
export default client;
  