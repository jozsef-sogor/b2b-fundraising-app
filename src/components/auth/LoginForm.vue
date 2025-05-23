<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { computed, ref, useTemplateRef } from "vue";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BaseFormField } from "@/components/base";
import FormHeader from "@/components/auth/FormHeader.vue";
import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .email({ message: "Enter a valid email" })
      .min(1, { message: "Enter your email address" }),
    password: z.string().trim().min(1, { message: "Enter your password" }),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const authStore = useAuthStore();
const router = useRouter();

const siteKey = computed(() => import.meta.env.VITE_H_CAPTCHA_SITE_KEY);
const captchaToken = ref("");
const captchaRef = useTemplateRef("captcha-ref");

const handleCaptchaVerify = (token: string) => {
  captchaToken.value = token;
};

const onSubmit = form.handleSubmit(async (formValues) => {
  await authStore
    .loginWithEmail(formValues.email, formValues.password, captchaToken.value)
    .then(() => {
      captchaRef.value?.reset();
      router.push("/");
    });
});
</script>

<template>
  <form id="login-form" class="flex flex-col gap-6" @submit="onSubmit">
    <FormHeader>
      <template #title>Login to your account</template>
      <template #subtitle>Enter your email below to login to your account.</template>
    </FormHeader>

    <BaseFormField label="Email" name="email" v-slot="field">
      <Input id="email" type="email" placeholder="m@example.com" v-bind="field" required />
    </BaseFormField>
    <BaseFormField label="Password" name="password" v-slot="field">
      <Input id="password" type="password" v-bind="field" required />
    </BaseFormField>

    <vue-hcaptcha ref="captcha-ref" :sitekey="siteKey" @verify="handleCaptchaVerify"></vue-hcaptcha>
    <Button type="submit" for="login-form" class="w-full"> Login </Button>

    <div class="grid gap-6">
      <div
        class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"
      >
        <span class="relative z-10 bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
      <Button variant="outline" class="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            fill="currentColor"
          />
        </svg>
        Login with GitHub
      </Button>
    </div>
    <div class="text-center text-sm">
      Don't have an account?
      <RouterLink :to="{ name: 'signup' }" class="underline underline-offset-4">
        Sign up
      </RouterLink>
    </div>
  </form>
</template>
