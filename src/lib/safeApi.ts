import { PostgrestBuilder } from "@supabase/postgrest-js";

export async function safeApi<T>(builder: PostgrestBuilder<T>): Promise<T> {
  const { data, error } = await builder;
  if (error) throw new Error(error.message);
  if (data === null) throw new Error("No data returned");
  return data;
}
