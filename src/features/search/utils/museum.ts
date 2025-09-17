import { getAllPaintings } from "@/utils/server/museum";
import { paintingsResponseSchema } from "@/validation/paintings";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

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
