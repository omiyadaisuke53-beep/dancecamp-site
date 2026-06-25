"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Cycling aspect ratios give the masonry a pleasing rhythm.
const RATIOS = [3 / 4, 4 / 3, 1, 4 / 3, 3 / 4, 1];

export function ImageGallery({ images = [] }) {
  const columns = [[], [], []];
  images.forEach((src, i) => columns[i % 3].push({ src, i }));

  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {columns.map((col, ci) => (
        <div key={ci} className="flex flex-col gap-5">
          {col.map(({ src, i }) => (
            <AnimatedImage key={src} src={src} alt={`Dance Camp ${i + 1}`} ratio={RATIOS[i % RATIOS.length]} />
          ))}
        </div>
      ))}
    </div>
  );
}

function AnimatedImage({ alt, src, ratio }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [loaded, setLoaded] = React.useState(false);

  return (
    <AspectRatio ref={ref} ratio={ratio} className="relative w-full overflow-hidden rounded-xl bg-forest/10">
      <img
        alt={alt}
        src={src}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full rounded-xl object-cover transition-all duration-[1200ms] ease-out",
          isInView && loaded ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
        )}
      />
    </AspectRatio>
  );
}
