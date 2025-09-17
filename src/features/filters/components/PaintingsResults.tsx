"use client";

import { useQueryState } from "nuqs";

export function PaintingsResults() {
  const [year] = useQueryState("year");

  return <div>results: year:{year}</div>;
}
