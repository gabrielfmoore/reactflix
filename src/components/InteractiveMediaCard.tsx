import { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import type { Media } from "../types";
import TrailerPlayer from "./TrailerPlayer";
import { Play, ChevronDown } from "lucide-react";
import { TMDB_API_OPTIONS } from "../lib/utils";
import MuteButton from "./MuteButton";

const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w400";

interface InteractiveMediaCardProps {
  media: Media;
  mediaType?: "movie" | "tv";
  onHoverChange?: (hovered: boolean) => void;
}

export default function InteractiveMediaCard({
  media,
  mediaType = "movie",
  onHoverChange,
}: InteractiveMediaCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [runtimeDisplay, setRuntimeDisplay] = useState<string | null>(null);
  const [rating, setRating] = useState<string | null>(null);
  const [expandAlign, setExpandAlign] = useState<"left" | "center" | "right">(
    "center",
  );
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [, setSearchParams] = useSearchParams();

  function handleMouseEnter() {
    hoverTimeout.current = setTimeout(async () => {
      // Determine edge alignment before expanding
      const rect = cardRef.current?.getBoundingClientRect();
      if (rect) {
        const expandedHalfWidth = rect.width * 0.75; // half of 150% expanded width
        const cardCenter = rect.left + rect.width / 2;
        if (cardCenter - expandedHalfWidth < 0) setExpandAlign("left");
        else if (cardCenter + expandedHalfWidth > window.innerWidth)
          setExpandAlign("right");
        else setExpandAlign("center");
      }
      setIsHovered(true);
      onHoverChange?.(true);
      try {
        const endpoint = mediaType === "tv" ? "tv" : "movie";
        const append = mediaType === "tv" ? "content_ratings" : "release_dates";
        const res = await fetch(
          `https://api.themoviedb.org/3/${endpoint}/${media.id}?append_to_response=${append}`,
          TMDB_API_OPTIONS,
        );
        const data = await res.json();
        if (mediaType === "tv") {
          const seasons = data.number_of_seasons;
          setRuntimeDisplay(
            seasons ? `${seasons} Season${seasons !== 1 ? "s" : ""}` : null,
          );
          const usRating = data.content_ratings?.results?.find(
            (r: { iso_3166_1: string }) => r.iso_3166_1 === "US",
          );
          setRating(usRating?.rating || null);
        } else {
          const mins = data.runtime;
          setRuntimeDisplay(mins ? `${mins}m` : null);
          const usRelease = data.release_dates?.results?.find(
            (r: { iso_3166_1: string }) => r.iso_3166_1 === "US",
          );
          const cert = usRelease?.release_dates?.find(
            (d: { certification: string }) => d.certification,
          )?.certification;
          setRating(cert || null);
        }
      } catch {
        setRuntimeDisplay(null);
        setRating(null);
      }
    }, 400);
  }

  function handleMouseLeave() {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsHovered(false);
    setIsTrailerPlaying(false);
    setRuntimeDisplay(null);
    setRating(null);
    setExpandAlign("center");
    onHoverChange?.(false);
  }

  const title = media.title || media.name || "";
  const posterUrl = media.poster_path
    ? TMDB_IMAGE_URL + media.poster_path
    : null;

  return (
    <div
      ref={cardRef}
      className="relative flex-shrink-0 w-[calc((100%-4px)/2)] md:w-[calc((100%-8px)/3)] min-[800px]:w-[calc((100%-12px)/4)] 4xl:w-[calc((100%-16px)/5)] min-[1280px]:w-[calc((100%-20px)/6)]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Base poster */}
      <div className="aspect-video rounded-sm overflow-hidden bg-[#2f2f2f]">
        {posterUrl ? (
          <img
            src={TMDB_IMAGE_URL + media.backdrop_path}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            {title}
          </div>
        )}
      </div>

      {isHovered && (
        <div
          className={`@container absolute top-[-100%] w-[150%] z-[120] rounded-md overflow-hidden shadow-2xl shadow-black/80 bg-[#181818] ${
            expandAlign === "left"
              ? "left-0"
              : expandAlign === "right"
                ? "right-0"
                : "left-1/2 -translate-x-1/2"
          }`}
        >
          {/* Video / poster area */}
          <div className="aspect-video relative overflow-hidden w-full h-[60%]">
            <TrailerPlayer
              mediaId={media.id}
              mediaType={mediaType}
              muted={isMuted}
              onPlay={() => setIsTrailerPlaying(true)}
              onEnd={() => setIsTrailerPlaying(false)}
            />
            {/* Poster cover — fades out when trailer is playing */}
            <div
              className={`absolute inset-0 transition-opacity duration-1500 ${isTrailerPlaying ? "opacity-0 pointer-events-none delay-[2500ms]" : "opacity-100 delay-0"}`}
            >
              {posterUrl && (
                <img
                  src={TMDB_IMAGE_URL + media.backdrop_path}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="absolute right-[1.4em] top-[70%] text-white z-20">
              <MuteButton
                isMuted={isMuted}
                onToggle={() => setIsMuted((m) => !m)}
              />
            </div>
            {/* Title overlay */}
            <div className="absolute top-[10em] left-3 text-white font-bold text-sm drop-shadow-lg">
              {title}
            </div>
          </div>

          {/* Info section */}
          <div className="text-[cqw] px-[1.4em] pb-[0.6em] pt-[0.3em] flex flex-col h-[40%] justify-between">
            {/* Action buttons */}
            <div className="flex items-center ml-[0.3em]">
              <button className="bg-white rounded-full h-[2em] w-[2em] flex items-center justify-center hover:bg-white/80 cursor-pointer">
                <Play fill="black" className="h-[1em] w-[1em] text-black " />
              </button>
              <button
                onClick={() => setSearchParams({ jbv: String(media.id) })}
                className="border border-gray-400 rounded-full h-[2em] w-[2em] flex items-center justify-center hover:border-white ml-auto cursor-pointer"
              >
                <ChevronDown className="text-white h-[1.4em] w-[1.4em]" />
              </button>
            </div>

            {/* Meta */}
            <div className="flex items-center my-[1em] pl-[0.2em] gap-[0.4em] text-gray-400">
              {rating && (
                <span className="border border-gray-400 font-thin px-[0.2em] pb-[0.1em] pt-[0.06em] leading-none">
                  {rating}
                </span>
              )}
              {runtimeDisplay && (
                <span className="font-thin">
                  {runtimeDisplay}
                </span>
              )}
              <span className="border border-gray-400 text-[0.4em] px-[0.5em]">
                HD
              </span>
            </div>

            {/* Genre tags */}
            <div className="flex mb-[1em] items-center text-white text-sm font-thin">
              Genre Tags • Quirky • Dark Comedy
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
