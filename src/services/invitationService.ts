import { withFindByValue } from "@/lib/serviceMethods";
import { type Invitation } from "@/types/entities";

export const invitationService = {
  ...withFindByValue<Invitation>("invites"),
};
