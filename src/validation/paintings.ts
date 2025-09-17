import * as v from "valibot";

export const paintingSchema = v.object({
  id: v.number(),
  title: v.string(),
  year: v.number(),
  type: v.string(),
  description: v.string(),
  image: v.pipe(v.string(), v.url()),
  gallery: v.array(v.pipe(v.string(), v.url())),
  artist: v.string(),
  location: v.string(),
  locationLink: v.pipe(v.string(), v.url()),
  movement: v.string(),
  color: v.string(),
  slug: v.string(),
});

export const paintingsSchema = v.array(paintingSchema);

export const paintingsResponseSchema = v.object({
  objects: paintingsSchema,
  totalCount: v.pipe(v.number(), v.integer(), v.minValue(0)),
  currentPage: v.pipe(v.number(), v.integer(), v.minValue(1)),
  totalPages: v.pipe(v.number(), v.integer(), v.minValue(1)),
  hasNextPage: v.boolean(),
  hasPrevPage: v.boolean(),
});
