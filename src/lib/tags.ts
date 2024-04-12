import * as TagsCache from "@/lib/notion/tags-cache";

export const writeTags = (tags = []) => {
  TagsCache.set(tags);
};
