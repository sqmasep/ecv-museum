"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useQueryState } from "nuqs";

export function PaintingsFilters() {
  const [year, setYear] = useQueryState("year", {
    defaultValue: "",
    clearOnDefault: true,
  });

  const [movement, setMovement] = useQueryState("movement", {
    defaultValue: "",
    clearOnDefault: true,
  });

  return (
    <div>
      <Select value={year} onValueChange={setYear}>
        <SelectTrigger>Year</SelectTrigger>
        <SelectContent>
          <SelectItem value="jsp">jsp</SelectItem>
          <SelectItem value="jsp2">jsp</SelectItem>
          <SelectItem value="jsp3">jsp</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
