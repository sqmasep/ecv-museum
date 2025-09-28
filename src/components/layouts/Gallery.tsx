import { PaintingSchema } from "@/validation/paintings";
import { Image } from "../Image";
import { Parallax } from "../animations/Parallax";
import TransitionLink from "../animations/TransitionLink";
import { Button } from "../ui/button";

export function Gallery({ paintings }: { paintings: PaintingSchema[] }) {
  return (
    <section className="py-20">
      <h2 className="italic font-bold text-3xl text-center">Gallery</h2>

      <div className="grid grid-cols-3 gap-4 container mx-auto mt-20">
        {paintings.slice(0, 6).map(painting => (
          <TransitionLink
            key={painting.id}
            href={`/paintings/${painting.slug}`}
            className="text-4xl font-cursive text-center text-white"
          >
            <Parallax
              background={
                <div className="relative w-full h-full">
                  <Image src={painting.image} alt={painting.title} />
                </div>
              }
              className="h-96 grid place-content-center"
            >
              {painting.title}
            </Parallax>
          </TransitionLink>
        ))}
      </div>

      <Button asChild className="mx-auto block w-max mt-20">
        <TransitionLink href="/paintings" className="text-lg">
          See all paintings
        </TransitionLink>
      </Button>
    </section>
  );
}
