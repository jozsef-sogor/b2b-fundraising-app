import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";
import { type Session } from "@supabase/supabase-js";
import { ref, computed } from "vue";
import { type User as AuthUser } from "@supabase/supabase-js";
import { useInvites } from "@/composables/useInvites";
import { useUsers } from "@/composables/useUsers";
import { toast } from "vue-sonner";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<AuthUser | null>(null);
  const accessLevel = ref<number | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const session = ref<Session | null>(null);
  const inviteValid = ref(false);
  const inviteCode = ref("");
  const organizationId = ref<string | null>(null);

  const userId = computed(() => user.value?.id);
  const isAdmin = computed(() => accessLevel.value === 200);
  const isSuperAdmin = computed(() => accessLevel.value === 300);

  const { verifyInviteCode } = useInvites();
  const { getAccessLevelByUserId } = useUsers();


  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    session.value = data.session;
    if (!data.session) return

    const userId = data.session.user.id;
    user.value = data.session.user;
    accessLevel.value = await getAccessLevelByUserId(userId) ?? 0;
  }

  const handleOnSessionChange = async () => {
    return supabase.auth.onAuthStateChange(async (_, _session) => {
      session.value = _session;

      if (_session) {
        const userId = _session.user.id;
        user.value = _session.user;
        accessLevel.value = await getAccessLevelByUserId(userId) ?? 0;
      }
    })
  }

  const loginWithEmail = async (email: string, password: string, captchaToken: string) => {
    loading.value = true;
    error.value = null;

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        captchaToken
      }
    });

    loading.value = false;

    if (loginError) {
      error.value = loginError.message;
      toast.error(error.value);
      return;
    }

    session.value = data.session;
    user.value = data.user;
  };

  const isInviteCodeValid = async (code: string) => {
    loading.value = true;
    error.value = null;

    try {
      const result = await verifyInviteCode(code);

      if (result && result.valid) {
        inviteValid.value = true;
        inviteCode.value = code;
        organizationId.value = result.organizationId;
        return true;
      } else {
        error.value = "Invalid invitation code.";
        return false;
      }
    } catch (err) {
      console.error(err)
      error.value = "Failed to verify invitation.";
      toast.error(error.value);
      return false;
    } finally {
      loading.value = false;
    }
  };

  const signupWithEmail = async (
    email: string,
    password: string,
    name: string,
    captchaToken: string,
  ) => {
    if (!inviteValid.value || !organizationId.value) {
      error.value = "Invalid signup state.";
      toast.error(error.value);
      return;
    }

    loading.value = true;
    error.value = null;

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        captchaToken,
        data: {
          first_name: name.split(" ")[0],
          last_name: name.split(" ")[1],
          organization_id: organizationId.value,
        },
      },
    });

    if (signUpError) {
      error.value = signUpError.message;
      console.error(signUpError);
      toast.error(error.value);
      return;
    }

    loading.value = false;

    user.value = data.user;
    session.value = data.session;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  }

  return {
    accessLevel,
    user,
    userId,
    isAdmin,
    isSuperAdmin,
    session,
    loading,
    error,
    inviteValid,
    organizationId,
    getSession,
    handleOnSessionChange,
    loginWithEmail,
    isInviteCodeValid,
    signupWithEmail,
    logout,
  };
});
