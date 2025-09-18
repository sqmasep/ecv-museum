"use client";

import { Image } from "@/components/Image";
import { Parallax } from "@/components/animations/Parallax";
import TransitionLink from "@/components/animations/TransitionLink";
import { cn } from "@/lib/utils";
import { PaintingSchema } from "@/validation/paintings";
import { useQueryState } from "nuqs";

export function PaintingsResults({
  paintings,
}: {
  paintings: PaintingSchema[];
}) {
  const [year] = useQueryState("year");
  const [artist] = useQueryState("artist");
  const [movement] = useQueryState("movement");

  return (
    <div>
      {artist} - {movement} - {year} ({paintings?.length} results)
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
            <Parallax
              amount={
                // do like a clamp between 50 and 100 based on the index
                Math.min(100, Math.max(50, 100 - i * 10))
              }
              background={<Image src={painting.image} alt={painting.title} />}
              className="grid place-content-center"
            >
              <h2 className="text-white font-cursive text-center mix-blend-difference z-10 text-6xl tracking-tight font-black">
                {painting.title} ({painting.year})
              </h2>
            </Parallax>
            {/* <div className="">
              <Image src={painting.image} alt={painting.title} />
            </div> */}

            {/* <h2 className="text-white font-cursive mix-blend-difference absolute z-10 text-6xl tracking-tight font-black left-1/2 top-1/2 -translate-1/2">
              {painting.title} ({painting.year})
            </h2> */}
          </TransitionLink>
        ))}
      </div>
    </div>
  );
}
