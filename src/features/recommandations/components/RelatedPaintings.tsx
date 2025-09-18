"use client";

import { Image } from "@/components/Image";
import TransitionLink from "@/components/animations/TransitionLink";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PaintingSchema } from "@/validation/paintings";

export function RelatedPaintings({
  paintings,
  ...props
}: {
  paintings: PaintingSchema[];
} & React.ComponentProps<typeof Carousel>) {
  return (
    <Carousel {...props}>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselContent>
        {paintings.map(painting => (
          <CarouselItem key={painting.id} className="basis-1/3 relative group">
            <TransitionLink
              href={`/paintings/${painting.slug}`}
              className="block"
            >
              <div className="size-96 -z-1 inset-0 group-hover:opacity-70 transition-opacity duration-300">
                <Image src={painting.image} alt={painting.title} />
              </div>
              <span className="absolute top-1/2 left-1/2 -translate-1/2 group-hover:text-black mix-blend-difference text-white font-cursive text-5xl">
                {painting.title}
              </span>
            </TransitionLink>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
