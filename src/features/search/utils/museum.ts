import { getAllPaintings } from "@/utils/server/museum";

export async function queryPaintings(query: string) {
  const { paintings } = await getAllPaintings();

  const filteredPaintings = paintings.filter(painting => {
    return (
      painting.title.toLowerCase().includes(query.toLowerCase()) ||
      painting.artist.toLowerCase().includes(query.toLowerCase()) ||
      painting.movement.toLowerCase().includes(query.toLowerCase())
    );
  });

  return filteredPaintings;
}
