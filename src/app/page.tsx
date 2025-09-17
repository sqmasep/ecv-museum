import { Gallery } from "@/components/layouts/Gallery";
import { Hero } from "@/components/layouts/Hero";
import { getAllPaintings } from "@/utils/server/museum";

export default async function Home() {
  const { paintings } = await getAllPaintings();

  return (
    <div className="text-red-400">
      <Hero />
      <Gallery paintings={paintings} />
      <section className="h-dvh">yo</section>
    </div>
  );
}
