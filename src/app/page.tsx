import { Gallery } from "@/components/layouts/Gallery";
import { Hero } from "@/components/layouts/Hero";
import { getAllPaintings } from "@/utils/server/museum";

export default async function Home() {
  const { paintings } = await getAllPaintings();

  return (
    <div>
      <Hero painting={paintings[0]} />
      <Gallery paintings={paintings} />
    </div>
  );
}
