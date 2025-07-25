import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "./database.types"

export function createClient() {
  return createClientComponentClient<Database>()
}

export const getSupabaseClient = createClient
