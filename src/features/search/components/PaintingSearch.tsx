"use client";

import TransitionLink from "@/components/animations/TransitionLink";
import { useDebounce } from "@/hooks/useDebounce";
import { getAllPaintings } from "@/utils/server/museum";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function PaintingSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    Awaited<ReturnType<typeof getAllPaintings>>["paintings"]
  >([]);
  const [debouncedQuery, setDebouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    const abortController = new AbortController();

    async function getFilteredPaintings() {
      const { paintings } = await getAllPaintings();
      const filtered = paintings.filter(p =>
        p.title.toLowerCase().includes(debouncedQuery.toLowerCase())
      );

      if (!abortController.signal.aborted) {
        setResults(filtered);
      }
    }

    getFilteredPaintings();

    return () => {
      abortController.abort();
    };
  }, [debouncedQuery]);

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

      <div className="absolute left-0 z-50 w-full flex flex-col top-full bg-background border p-2 rounded-xl max-h-36 overflow-auto">
        {results.map(p => (
          <TransitionLink
            href={`/paintings/${p.slug}`}
            onClick={() => {
              setQuery("");
              setDebouncedQuery("");
              setResults([]);
            }}
            className="hover:bg-zinc-200"
            key={p.id}
          >
            {p.title}
          </TransitionLink>
        ))}
      </div>
    </div>
  );
}
