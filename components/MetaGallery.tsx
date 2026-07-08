import VariantGrid from "@/components/VariantGrid";
import type { GalleryMeta } from "@/data/types";

export default function MetaGallery({ meta }: { meta: GalleryMeta }) {
  return (
    <VariantGrid
      countries={meta.countries}
      attribution={meta.attribution}
      metaLabel={meta.name}
    />
  );
}
