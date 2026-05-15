import { createClient } from "@supabase/supabase-js/dist/index.cjs"; 
import dotenv from "dotenv";
import ws from "ws";

dotenv.config();

export const db = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,

    {
    realtime: {
      transport: ws,
    },
  }
);

