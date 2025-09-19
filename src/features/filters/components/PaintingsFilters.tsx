"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { PaintingSchema } from "@/validation/paintings";
import { useQueryState } from "nuqs";

export function PaintingsFilters({
  paintings,
  className,
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
    <div {...props} className={cn("flex items-center gap-2", className)}>
      <div>
        <Label htmlFor="query">Search</Label>
        <Input value={query} onChange={e => setQuery(e.target.value)} />
      </div>

      <Select value={artist} onValueChange={setArtist}>
        <SelectTrigger id="artist">
          <SelectValue />
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
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {[...new Set(paintings.map(p => p.movement))].map(movement => (
            <SelectItem key={movement} value={movement}>
              {movement}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
