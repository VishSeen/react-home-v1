import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'f6b6c4a4372d49fefd53679b62b93c207c153044', queries,  });
export default client;
  