import { Copy } from "@/components/animations/Copy";
import { Image } from "@/components/Image";
import { Badge } from "@/components/ui/badge";
import { RelatedPaintings } from "@/features/recommandations/components/RelatedPaintings";
import { htmlToText } from "@/utils/parser";
import {
  getAllPaintingsSlugs,
  getPaintingBySlug,
  getRelatedPaintings,
} from "@/utils/server/museum";

export const revalidate = 3600; // revalidate this page every hour

export async function generateStaticParams() {
  const slugs = await getAllPaintingsSlugs();

  return slugs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const painting = await getPaintingBySlug(slug);

  return {
    title: painting.title,
    description: `Discover the painting ${painting.title} by ${painting.artist} in our museum collection.`,
    openGraph: {
      images: [painting.image],
    },
  };
}

export default async function PaintingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const painting = await getPaintingBySlug(slug);
  const relatedPaintings = await getRelatedPaintings(painting);

  const description = htmlToText(painting.description);

  return (
    <div>
      <div className="flex gap-8 min-h-dvh">
        <div className="relative shrink-0 basis-1/2">
          <Image src={painting.image} alt={painting.title} />
        </div>
        <div className="self-center">
          {/* <span className="items-center grow gap-2 rounded-full bg-zinc-50 border border-red-500 p-1 pr-4 text-zinc-700 text-sm inline-flex">
          <MapPin className="text-red-500" />
          {painting.location}
        </span> */}
          <Badge variant="outline">{painting.movement}</Badge>
          <h1 className="font-cursive text-9xl font-bold flex items-center gap-4 text-balance">
            <Copy>
              <span>{painting.title}</span>
            </Copy>
          </h1>

          <p>by {painting.artist}</p>
        </div>
      </div>

      <div className="max-w-3xl mt-20 mx-auto">{description}</div>

      <div className="py-20 bg-zinc-50 mt-20">
        <h2 className="text-2xl font-bold italic text-center">
          Related paintings
        </h2>
        <RelatedPaintings
          className="container mx-auto mt-4"
          paintings={relatedPaintings}
        />
      </div>
    </div>
  );
}
