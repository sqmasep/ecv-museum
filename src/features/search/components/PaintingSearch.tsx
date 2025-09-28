"use client";

import { Image } from "@/components/Image";
import TransitionLink from "@/components/animations/TransitionLink";
import { useDebounce } from "@/hooks/useDebounce";
import { PaintingSchema } from "@/validation/paintings";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const MAX_RESULTS_LENGTH = 5;

export function PaintingSearch({ paintings }: { paintings: PaintingSchema[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PaintingSchema[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    const filtered = [] as PaintingSchema[];

    function searchByTitle(p: PaintingSchema) {
      return p.title.toLowerCase().includes(debouncedQuery.toLowerCase());
    }

    function searchByArtist(p: PaintingSchema) {
      return p.artist.toLowerCase().includes(debouncedQuery.toLowerCase());
    }

    function searchByMovement(p: PaintingSchema) {
      return p.movement.toLowerCase().includes(debouncedQuery.toLowerCase());
    }

    function searchByYear(p: PaintingSchema) {
      return p.year.toString().includes(debouncedQuery);
    }

    const searchFns = [
      searchByTitle,
      searchByArtist,
      searchByMovement,
      searchByYear,
    ];

    searchFns.forEach(searchFn => {
      if (filtered.length >= MAX_RESULTS_LENGTH) return;
      const res = paintings.filter(searchFn).slice(0, MAX_RESULTS_LENGTH);
      filtered.push(...res);
    });

    setResults(filtered.slice(0, MAX_RESULTS_LENGTH));
  }, [debouncedQuery, paintings]);

  return (
    <div className="relative">
      <Search
        className="absolute pointer-events-none top-1/2 left-2 -translate-y-1/2"
        size={16}
      />

      <input
        className="pl-8 py-1 border border-zinc-800 rounded"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <div
        data-lenis-prevent
        data-hidden={
          results.length === 0 || debouncedQuery.length === 0 || undefined
        }
        className="absolute right-0 z-50 flex flex-col top-full bg-background border p-2 rounded-xl max-h-96 overflow-auto data-hidden:hidden"
      >
        {results.map(p => (
          <TransitionLink
            href={`/paintings/${p.slug}`}
            onClick={() => {
              setQuery("");
              setDebouncedQuery("");
              setResults([]);
            }}
            className="hover:bg-zinc-200 flex items-center gap-4 p-2 rounded"
            key={p.id}
          >
            <div className="size-12 relative shrink-0">
              <Image src={p.image} alt={p.title} />
            </div>

            <span className="inline items-center gap-1">
              <span>{p.title}</span>
              <span className="italic text-zinc-600 text-sm">({p.year})</span>
            </span>
          </TransitionLink>
        ))}
      </div>
    </div>
  );
}
