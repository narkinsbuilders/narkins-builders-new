import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: '/home/ossaid/work/narkins-builders/tina/__generated__/.cache/1752871505903', url: 'http://localhost:4001/graphql', token: 'test', queries,  });
export default client;
  