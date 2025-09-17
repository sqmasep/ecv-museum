"use server";

import * as v from "valibot";
import {
  paintingSchema,
  paintingsResponseSchema,
  paintingsSchema,
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
