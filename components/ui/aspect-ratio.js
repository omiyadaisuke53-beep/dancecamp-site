"use client";

import { forwardRef } from "react";

// Lightweight AspectRatio (replaces @radix-ui/react-aspect-ratio).
const AspectRatio = forwardRef(function AspectRatio(
  { ratio = 1, className = "", style, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={className}
      style={{ aspectRatio: String(ratio), ...style }}
      {...props}
    >
      {children}
    </div>
  );
});

export { AspectRatio };
