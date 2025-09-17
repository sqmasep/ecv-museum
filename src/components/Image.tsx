import NextImage from "next/image";

export function Image({ ...props }: React.ComponentProps<typeof NextImage>) {
  return (
    <NextImage
      quality={75}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      fill
      className="object-cover"
      {...props}
    />
  );
}
