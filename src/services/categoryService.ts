import { withGetAll, withCreate, withDelete, withFilter } from "@/lib/serviceMethods";
import { type Category, type CategoryInsert } from "@/types/entities";

export const categoryService = {
  ...withGetAll<Category>("categories"),
  ...withDelete("categories"),
  ...withFilter<Category>("categories"),
  ...withCreate<Category, CategoryInsert>("categories"),
};
