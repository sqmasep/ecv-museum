import TransitionLink from "@/components/animations/TransitionLink";
import { Image } from "@/components/Image";
import { PaintingsFilters } from "@/features/filters/components/PaintingsFilters";
import { PaintingsResults } from "@/features/filters/components/PaintingsResults";
import { cn } from "@/lib/utils";
import { getAllPaintings } from "@/utils/server/museum";

export const revalidate = 3600;

export default async function PaintingsPage() {
  const { paintings } = await getAllPaintings();

  return (
    <div className="pt-24">
      <h1 className="font-bold text-9xl tracking-tighter">Paintings</h1>

      <div>
        filters
        <input />
        <PaintingsFilters />
        <PaintingsResults />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {paintings.map((painting, i) => (
          <TransitionLink
            href={`/paintings/${painting.slug}`}
            className={cn(
              "border rounded-lg bg-background relative min-h-80",
              i % 6 === 0 && "col-span-2",
              i % 4 === 0 && "row-span-3",
              i % 2 === 0 && "col-span-2",
              i % 3 === 0 && "row-span-2"
            )}
            key={painting.id}
          >
            <div className="">
              <Image src={painting.image} alt={painting.title} />
            </div>

            <h2 className="text-white font-cursive mix-blend-difference absolute z-10 text-6xl tracking-tight font-black left-1/2 top-1/2 -translate-1/2">
              {painting.title} ({painting.year})
            </h2>
          </TransitionLink>
        ))}
      </div>
    </div>
  );
}
