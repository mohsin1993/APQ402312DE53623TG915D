import { z } from "zod";

export const Organization = z.object({
  id: z.number(),
  login: z.string(),
  node_id: z.string(),
  description: z.string().nullable().optional(),
  avatar_url: z.string(),
});

export type Organization = z.infer<typeof Organization>;

export const Organizations = z.object({
  incomplete_results: z.boolean(),
  total_count: z.number(),
  items: z.array(Organization),
});

export type Organizations = z.infer<typeof Organizations>;

export const Repository = z.object({
  id: z.number(),
  name: z.string(),
  open_issues: z.number(),
  watchers: z.number(),
});

export type Repository = z.infer<typeof Repository>;

export const Repositories = z.object({
  incomplete_results: z.boolean(),
  total_count: z.number(),
  items: z.array(Repository),
});

export type Repositories = z.infer<typeof Repositories>;
