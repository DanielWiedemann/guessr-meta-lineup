"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export default function ExpandableImage({
  src,
  alt,
  className = "",
  imageClassName = "object-contain p-2",
  sizes = "(max-width: 640px) 100vw, 480px",
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setExpanded(true)}
        aria-label={`Expand image: ${alt}`}
        className={`relative block w-full cursor-zoom-in ${className}`}
      >
        <Image src={src} alt={alt} fill unoptimized sizes={sizes} className={imageClassName} />
      </button>

      {expanded &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setExpanded(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-8"
          >
            <div
              className="relative h-full max-h-[90vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={src} alt={alt} fill unoptimized sizes="100vw" className="object-contain" />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
