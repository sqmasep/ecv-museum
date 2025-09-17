import { Copy } from "@/components/animations/Copy";
import { Image } from "@/components/Image";
import { Badge } from "@/components/ui/badge";
import { htmlToText } from "@/utils/parser";
import { getAllPaintingsSlugs, getPaintingBySlug } from "@/utils/server/museum";
import { MapPin } from "lucide-react";

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

  return (
    <div className="flex gap-8 min-h-dvh">
      <div className="relative basis-1/2">
        <Image src={painting.image} alt={painting.title} />
      </div>
      <div className="self-center">
        <span className="items-center grow gap-2 rounded-full bg-zinc-50 border border-red-500 p-1 pr-4 text-zinc-700 text-sm inline-flex">
          <MapPin className="text-red-500" />
          {painting.location}
        </span>
        <h1 className="text-6xl font-bold flex items-center gap-4">
          <Copy>
            <p>{painting.title}</p>
          </Copy>

          <Badge variant="outline">{painting.movement}</Badge>
        </h1>
        <p>{htmlToText(painting.description)}</p>

        <p>by {painting.artist}</p>
      </div>
    </div>
  );
}
