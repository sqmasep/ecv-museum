"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaintingSchema } from "@/validation/paintings";
import { Trash } from "lucide-react";
import { useQueryState } from "nuqs";

export function PaintingsFilters({
  paintings,
  ...props
}: {
  paintings: PaintingSchema[];
} & React.ComponentProps<"div">) {
  const [query, setQuery] = useQueryState("q", {
    defaultValue: "",
    clearOnDefault: true,
  });

  const [artist, setArtist] = useQueryState("artist", {
    defaultValue: "",
    clearOnDefault: true,
  });

  const [movement, setMovement] = useQueryState("movement", {
    defaultValue: "",
    clearOnDefault: true,
  });

  const [year, setYear] = useQueryState("year", {
    defaultValue: "",
    clearOnDefault: true,
  });

  function clearFilters() {
    setQuery("");
    setArtist("");
    setMovement("");
    setYear("");
  }

  return (
    <div {...props}>
      <div className="container mx-auto flex items-center gap-2 rounded-full p-2 bg-zinc-100 m-4">
        <div>
          <Input
            placeholder="Search paintings..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <Select value={artist} onValueChange={setArtist}>
          <SelectTrigger id="artist">
            <SelectValue placeholder="Artist" />
          </SelectTrigger>
          <SelectContent>
            {[...new Set(paintings.map(p => p.artist))].map(artist => (
              <SelectItem key={artist} value={artist}>
                {artist}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={movement} onValueChange={setMovement}>
          <SelectTrigger id="movement">
            <SelectValue placeholder="Movement" />
          </SelectTrigger>
          <SelectContent>
            {[...new Set(paintings.map(p => p.movement))].map(movement => (
              <SelectItem key={movement} value={movement}>
                {movement}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(year || query.length > 0 || artist || movement) && (
          <Button variant="outline" onClick={clearFilters}>
            Clear filters
            <Trash />
          </Button>
        )}
      </div>
    </div>
  );
}
