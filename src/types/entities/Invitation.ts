import { type Database } from "@/types/supabase";

export type Invitation = Database["public"]["Tables"]["invites"]["Row"];
export type InvitationInsert = Database["public"]["Tables"]["invites"]["Insert"];
export type InvitationUpdate = Database["public"]["Tables"]["invites"]["Update"];
