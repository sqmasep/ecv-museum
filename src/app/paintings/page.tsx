import { PaintingsFilters } from "@/features/filters/components/PaintingsFilters";
import { PaintingsResults } from "@/features/filters/components/PaintingsResults";
import { getAllPaintings } from "@/utils/server/museum";

export const revalidate = 3600;

export default async function PaintingsPage() {
  const { paintings } = await getAllPaintings();

  return (
    <div className="pt-24">
      <h1 className="font-bold text-[300px] tracking-tighter">Paintings</h1>

      <div>
        <PaintingsFilters
          className="sticky top-16 w-full z-50 bg-white/80 backdrop-blur-md border-b"
          paintings={paintings}
        />
        <PaintingsResults paintings={paintings} />
      </div>
    </div>
  );
}
