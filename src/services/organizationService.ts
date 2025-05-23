import {
  withGetAll,
  withFindById,
  withCreate,
  withFilter,
  withFindByValue,
  withDelete,
  withUpdate,
} from "@/lib/serviceMethods";
import {
  type Organization,
  type OrganizationInsert,
  type OrganizationUpdate,
} from "@/types/entities";

export const organizationService = {
  ...withGetAll<Organization>("organizations"),
  ...withFindById<Organization>("organizations"),
  ...withFilter<Organization>("organizations"),
  ...withFindByValue<Organization>("organizations"),
  ...withDelete("organizations"),
  ...withUpdate<Organization, OrganizationUpdate>("organizations"),
  ...withCreate<Organization, OrganizationInsert>("organizations"),
};
