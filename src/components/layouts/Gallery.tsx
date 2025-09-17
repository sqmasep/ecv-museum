import { PaintingSchema } from "@/validation/paintings";

export function Gallery({ paintings }: { paintings: PaintingSchema[] }) {
  return (
    <section>
      <h2 className="italic font-">Gallery</h2>
    </section>
  );
}
