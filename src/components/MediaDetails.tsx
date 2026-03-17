import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { X, Captions } from "lucide-react";
import TrailerPlayer from "./TrailerPlayer";
import { TMDB_API_OPTIONS } from "@/lib/utils";
import audioDescription from "../assets/ad.png";

const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w1280";

export default function MediaDetails() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mediaId = searchParams.get("jbv");
  const mediaType = (searchParams.get("type") || "movie") as "movie" | "tv";
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [backdropPath, setBackdropPath] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [runtime, setRuntime] = useState<string | null>(null);
  const [rating, setRating] = useState<string | null>(null);
  const [genres, setGenres] = useState<string[]>([]);
  const [overview, setOverview] = useState<string | null>(null);

  function close() {
    setSearchParams({});
  }

  // Fetch all details when mediaId changes
  useEffect(() => {
    if (!mediaId) return;
    setBackdropPath(null);
    setIsTrailerPlaying(false);
    setTitle(null);
    setYear(null);
    setRuntime(null);
    setRating(null);
    setGenres([]);
    setOverview(null);
    const endpoint = mediaType === "tv" ? "tv" : "movie";
    const append = mediaType === "tv" ? "content_ratings" : "release_dates";
    fetch(
      `https://api.themoviedb.org/3/${endpoint}/${mediaId}?append_to_response=${append}`,
      TMDB_API_OPTIONS,
    )
      .then((r) => r.json())
      .then((data) => {
        setBackdropPath(data.backdrop_path || null);
        setTitle(data.title || data.name || null);
        setOverview(data.overview || null);
        setGenres((data.genres || []).map((g: { name: string }) => g.name));
        if (mediaType === "tv") {
          const seasons = data.number_of_seasons;
          setRuntime(
            seasons ? `${seasons} Season${seasons !== 1 ? "s" : ""}` : null,
          );
          setYear(data.first_air_date ? data.first_air_date.slice(0, 4) : null);
          const usRating = data.content_ratings?.results?.find(
            (r: { iso_3166_1: string }) => r.iso_3166_1 === "US",
          );
          setRating(usRating?.rating || null);
        } else {
          const mins = data.runtime;
          if (mins) {
            const h = Math.floor(mins / 60);
            const m = mins % 60;
            setRuntime(h > 0 ? `${h}h ${m}m` : `${m}m`);
          }
          setYear(data.release_date ? data.release_date.slice(0, 4) : null);
          const usRelease = data.release_dates?.results?.find(
            (r: { iso_3166_1: string }) => r.iso_3166_1 === "US",
          );
          const cert = usRelease?.release_dates?.find(
            (d: { certification: string }) => d.certification,
          )?.certification;
          setRating(cert || null);
        }
      })
      .catch(() => {});
  }, [mediaId, mediaType]);

  // Scroll lock
  useEffect(() => {
    if (mediaId) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mediaId]);

  if (!mediaId) return null;

  return (
    <>
      {/* Backdrop — pure fixed layer, never scrolls */}
      <div className="fixed inset-0 bg-black/70 z-[200]" onClick={close} />
      {/* Scroll container — transparent, scrollbar at viewport edge */}
      <div className="fixed inset-0 z-[201] overflow-y-auto" onClick={close}>
        <div className="min-h-full flex items-start justify-center px-[5px] py-[5vh]">
          {/* Panel */}
          <div
            className="relative w-full max-w-[850px] rounded-md overflow-hidden bg-[#141414]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-5 right-5 z-10 bg-black/50 rounded-full p-1.5 hover:bg-black/80"
            >
              <X className="text-white w-6 h-6" />
            </button>

            {/* Video area */}
            <div className="relative w-full aspect-video overflow-hidden">
              <TrailerPlayer
                mediaId={Number(mediaId)}
                mediaType={mediaType}
                className="-translate-y-[10%]"
                onPlay={() => setIsTrailerPlaying(true)}
                onEnd={() => setIsTrailerPlaying(false)}
              />
              {/* Poster cover */}
              <div
                className={`absolute inset-0 transition-opacity duration-1500 ${isTrailerPlaying ? "opacity-0 pointer-events-none delay-[2500ms]" : "opacity-100 delay-0"}`}
              >
                {backdropPath && (
                  <img
                    src={TMDB_IMAGE_URL + backdropPath}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* Your content below */}
            <div className="relative flex justify-between mt-[-3vw] py-4 px-[48px] bg-[#141414]">
              <div className="w-[64%] text-white">
                <div className="flex items-center text-gray-400 text-[16px] font-thin gap-2 my-2">
                  <div>{year}</div>
                  <div>{runtime}</div>
                  <span className="flex items-center border border-gray-400 rounded-[2px] text-[10px] h-[15px] px-[4px] font-bold">
                    HD
                  </span>
                  <img
                    src={audioDescription}
                    alt="Audio Description"
                    className="h-4"
                  />
                  <Captions />
                </div>
                <div className="inline-block border border-gray-400 font-thin px-1.5 text-xs">
                  {rating}
                </div>
                <div className="my-3 text-2xl">{title}</div>
                <div className="text-sm font-thin">{overview}</div>
              </div>
              <div className="w-[32%] mt-1 text-sm text-gray-500">
                <div>Cast:</div>
                <div>Genres: {genres.join(", ")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
