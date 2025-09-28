"use server";

import * as v from "valibot";
import {
  PaintingSchema,
  paintingSchema,
  paintingsResponseSchema,
} from "@/validation/paintings";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function getAllPaintings() {
  const res = await fetch(`${API_URL}/objects`);
  const data = await res.json();

  const safeData = v.parse(paintingsResponseSchema, data);

  return {
    paintings: safeData.objects,
    totalCount: safeData.totalCount,
    currentPage: safeData.currentPage,
    totalPages: safeData.totalPages,
    hasNextPage: safeData.hasNextPage,
    hasPrevPage: safeData.hasPrevPage,
  };
}

export async function getAllPaintingsSlugs() {
  const data = await getAllPaintings();

  return data.paintings.map(painting => ({ slug: painting.slug }));
}

export async function getPaintingBySlug(slug: string) {
  const res = await fetch(`${API_URL}/objects/${slug}`);
  const data = await res.json();

  const safeData = v.parse(paintingSchema, data);

  return safeData;
}

export async function getRelatedPaintings(painting: PaintingSchema) {
  const { paintings } = await getAllPaintings();

  const related = [] as PaintingSchema[];

  for (const p of paintings) {
    if (p.slug === painting.slug) continue;
    if (related.length >= 4) break;

    if (p.artist === painting.artist) {
      related.push(p);
      continue;
    }

    // Related by movement
    if (p.movement === painting.movement) {
      related.push(p);
      continue;
    }

    // Related by
    if (p.type === painting.type) {
      related.push(p);
      continue;
    }

    // Related by year (within a decade)
    if (p.year >= painting.year - 10 && p.year <= painting.year + 10) {
      related.push(p);
      continue;
    }

    // Related by location
    if (p.location === painting.location) {
      related.push(p);
      continue;
    }
  }

  return related;
}
