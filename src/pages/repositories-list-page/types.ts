import { z } from "zod";

const validateMinMax = (data: { minimumStars?: number; maximumStars?: number }) => {
  if (
    (data.minimumStars || data.minimumStars === 0) &&
    (data.maximumStars || data.maximumStars === 0)
  ) {
    return data.maximumStars >= data.minimumStars;
  }
  return true;
};

export const formSchema = z
  .object({
    searchRepository: z.string().optional(),
    minimumStars: z.number().int().min(0).optional(),
    maximumStars: z.number().int().min(0).optional(),
  })
  .refine(validateMinMax, {
    message: "Minimum must be lower than maximum.",
    path: ["minimumStars"],
  })
  .refine(validateMinMax, {
    message: " ",
    path: ["maximumStars"],
  });

export type FormSchema = z.infer<typeof formSchema>;
