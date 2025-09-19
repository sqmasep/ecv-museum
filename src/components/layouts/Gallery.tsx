import { PaintingSchema } from "@/validation/paintings";
import { Image } from "../Image";

export function Gallery({ paintings }: { paintings: PaintingSchema[] }) {
  return (
    <section>
      <h2 className="italic font-bold">Gallery</h2>

      {paintings.map(painting => (
        <div key={painting.id}>
          <div className="relative ">
            <Image src={painting.image} alt={painting.title} />
          </div>
        </div>
      ))}
    </section>
  );
}
