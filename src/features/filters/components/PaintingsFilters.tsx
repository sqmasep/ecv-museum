"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { PaintingSchema } from "@/validation/paintings";
import { useQueryState } from "nuqs";

export function PaintingsFilters({
  paintings,
}: {
  paintings: PaintingSchema[];
}) {
  const [artist, setArtist] = useQueryState("artist", {
    defaultValue: "",
    clearOnDefault: true,
  });

  const [movement, setMovement] = useQueryState("movement", {
    defaultValue: "",
    clearOnDefault: true,
  });

  return (
    <div>
      <Select value={artist} onValueChange={setArtist}>
        <SelectTrigger>Artist</SelectTrigger>
        <SelectContent>
          {paintings.map(painting => (
            <SelectItem key={painting.id} value={painting.artist}>
              {painting.artist}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
