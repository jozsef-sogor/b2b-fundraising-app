import { supabase } from "@/lib/supabase";
import { safeApi } from "@/lib/safeApi";

export const withGetAll = <T>(table: string) => ({
  getAll: () => safeApi<T[]>(supabase.from(table).select("*")),
});

export const withFindById = <T>(table: string) => ({
  findById: (id: string) => safeApi<T>(supabase.from(table).select("*").eq("id", id).single()),
});

export const withFindByValue = <T>(table: string) => ({
  findByValue: <K extends keyof T>(column: K, value: T[K]) =>
    safeApi<T>(
      supabase
        .from(table)
        .select("*")
        .eq(String(column), value as T[K])
        .single(),
    ),
});

type FilterValue = string | number | boolean | null | (string | number | boolean | null)[];

export const withFilter = <T>(table: string) => ({
  filter: (filters: Partial<Record<keyof T, FilterValue>>) => {
    let query = supabase.from(table).select("*");
    for (const [key, value] of Object.entries(filters)) {
      if (Array.isArray(value)) {
        query = query.in(key, value);
      } else {
        query = query.eq(key, value);
      }
    }
    return safeApi<T[]>(query);
  },
});

export const withCreate = <T, Insert>(table: string) => ({
  // @ts-expect-error Ignore due to return type
  create: (data: Insert) => safeApi<T>(supabase.from(table).insert(data).select()),
});

export const withUpdate = <T, Update>(table: string) => ({
  update: (id: string, updates: Update) =>
    safeApi<T>(supabase.from(table).update(updates).eq("id", id).select().single()),
});

export const withDelete = (table: string) => ({
  delete: (id: string) => safeApi(supabase.from(table).delete().eq("id", id)),
});
