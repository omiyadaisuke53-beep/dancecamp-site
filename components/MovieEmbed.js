import { MOVIE_YT_ID } from "@/lib/content";

// Responsive 16:9 YouTube embed (privacy-friendly nocookie domain).
export default function MovieEmbed({ id = MOVIE_YT_ID, title = "Dance Camp — Movie" }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-ink shadow-xl ring-1 ring-bone/10">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
