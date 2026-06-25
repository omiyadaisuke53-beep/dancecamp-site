/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site → export to `out/` for Cloudflare Pages (static hosting).
  output: "export",
  images: {
    // Static export can't use the Next image optimizer; serve images as-is.
    unoptimized: true,
  },
};

export default nextConfig;
