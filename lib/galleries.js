// Photo collections shown on /gallery and /gallery/[slug].
const range = (n, fn) => Array.from({ length: n }, (_, i) => fn(i + 1));
const pad = (i) => String(i).padStart(2, "0");

export const galleries = [
  {
    slug: "dance-retreat-2023",
    title: "Dance Retreat",
    year: "2023",
    images: range(16, (i) => `/images/gallery/2023/${pad(i)}.jpg`),
  },
  {
    slug: "dance-camp-2024",
    title: "Dance Camp",
    year: "2024",
    images: range(14, (i) => `/images/gallery/2024/${pad(i)}.jpg`),
  },
  {
    slug: "dance-camp-2025",
    title: "Dance Camp",
    year: "2025",
    // g09/g10 are 2024 photos (kept only in the Concept photo roll); 2025
    // gallery uses g01–g08 + p01–p26, all from the 2025 shoot.
    images: [
      ...range(8, (i) => `/images/gallery/g${pad(i)}.jpg`),
      ...range(26, (i) => `/images/gallery/p${pad(i)}.jpg`),
    ],
  },
];

export const getGallery = (slug) => galleries.find((g) => g.slug === slug);
