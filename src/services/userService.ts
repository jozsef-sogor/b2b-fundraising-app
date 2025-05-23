import {
  withGetAll,
  withFindById,
  withCreate,
  withFilter,
  withFindByValue,
  withDelete,
  withUpdate,
} from "@/lib/serviceMethods";
import { type User, type UserInsert, type UserUpdate } from "@/types/entities";

export const userService = {
  ...withGetAll<User>("users"),
  ...withFindById<User>("users"),
  ...withFilter<User>("users"),
  ...withFindByValue<User>("users"),
  ...withDelete("users"),
  ...withUpdate<User, UserUpdate>("users"),
  ...withCreate<User, UserInsert>("users"),
};
