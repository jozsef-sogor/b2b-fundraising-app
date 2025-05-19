import { supabase } from '@/lib/supabaseClient';
import { useUserStore } from '@/stores/user';

export function accessControlled(table: string) {
  const { role, companyId } = useUserStore();
  const isScoped = role < 300;

  const addScope = (query) =>
    isScoped && companyId ? query.eq('company_id', companyId) : query;

  const withCompanyId = (data) =>
    isScoped ? { ...data, company_id: companyId } : data;

  return {
    select: (columns = '*') =>
      addScope(supabase.from(table).select(columns)),

    insert: (data) =>
      supabase.from(table).insert(
        Array.isArray(data)
          ? data.map(withCompanyId)
          : withCompanyId(data)
      ),

    upsert: (data) =>
      supabase.from(table).upsert(
        Array.isArray(data)
          ? data.map(withCompanyId)
          : withCompanyId(data)
      ),

    update: (data) =>
      addScope(supabase.from(table).update(data)),

    delete: () =>
      addScope(supabase.from(table).delete()),

  };
}
