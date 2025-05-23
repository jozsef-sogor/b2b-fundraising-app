import {
  withGetAll,
  withFindById,
  withFindByValue,
  withCreate,
  withFilter,
} from "@/lib/serviceMethods";
import { type Donation, type DonationInsert } from "@/types/entities";

export const donationService = {
  ...withGetAll<Donation>("donations"),
  ...withFindById<Donation>("donations"),
  ...withFindByValue<Donation>("donations"),
  ...withFilter<Donation>("donations"),
  ...withCreate<Donation, DonationInsert>("donations"),
};
