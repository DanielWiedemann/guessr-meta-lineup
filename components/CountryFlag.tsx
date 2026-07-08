import Image from "next/image";
import { flagUrl } from "@/data/countries";

export default function CountryFlag({
  code,
  name,
  size = 20,
}: {
  code: string;
  name: string;
  size?: number;
}) {
  return (
    <Image
      src={flagUrl(code)}
      alt={`Flag of ${name}`}
      width={size}
      height={size * 0.75}
      unoptimized
      className="rounded-[2px] object-cover ring-1 ring-black/20"
      style={{ width: size, height: size * 0.75 }}
    />
  );
}
