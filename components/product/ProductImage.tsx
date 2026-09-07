import Image from "next/image";
import { Placeholder } from "@/components/ui/Placeholder";
import { imageKindLabels, imageMeta, placeholderAspect, primaryImage, type Product, type ProductImage as ProductImageT } from "@/content/products";

interface ProductImageProps {
  product: Product;
  /** A specific image; defaults to the product's primary image. */
  image?: ProductImageT;
  colorway?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Force a fixed aspect for grid alignment; defaults to the image's own. */
  aspect?: number;
}

/**
 * Renders a product image in a frame, or a labelled placeholder when none
 * exists. Photographs of the keyed garment are shown `contain` with padding
 * so the cut-out never gets cropped; renders carry their own backdrops and
 * fill the frame.
 */
export function ProductImage({ product, image, colorway, sizes, priority, className = "", aspect }: ProductImageProps) {
  const img = image ?? primaryImage(product, colorway);
  if (!img) {
    return <Placeholder aspect={aspect ?? placeholderAspect(product)} label={product.name} className={className} />;
  }
  const meta = imageMeta(img);
  const isPhoto = img.kind === "photo";
  const ratio = aspect ?? meta.width / meta.height;
  return (
    <div className={`frame ${isPhoto ? "frame-contain" : ""} ${className}`} style={{ aspectRatio: `${ratio}` }}>
      <Image
        src={meta.src}
        alt={img.alt}
        width={meta.width}
        height={meta.height}
        sizes={sizes}
        priority={priority}
        className={isPhoto ? "h-full w-full object-contain p-[8%]" : "h-full w-full object-contain"}
      />
    </div>
  );
}

export function imageKindLabel(product: Product, colorway?: string): string {
  const img = primaryImage(product, colorway);
  if (!img) return "Not photographed yet";
  return imageKindLabels[img.kind];
}
