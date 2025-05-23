import {
  withGetAll,
  withFindById,
  withCreate,
  withFilter,
  withFindByValue,
  withDelete,
  withUpdate,
} from "@/lib/serviceMethods";
import { type Campaign, type CampaignInsert, type CampaignUpdate } from "@/types/entities";

export const campaignService = {
  ...withGetAll<Campaign>("campaigns"),
  ...withFindById<Campaign>("campaigns"),
  ...withFilter<Campaign>("campaigns"),
  ...withFindByValue<Campaign>("campaigns"),
  ...withDelete("campaigns"),
  ...withUpdate<Campaign, CampaignUpdate>("campaigns"),
  ...withCreate<Campaign, CampaignInsert>("campaigns"),
};
