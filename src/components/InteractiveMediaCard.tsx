import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type { Media } from "../types";
import TrailerPlayer from "./TrailerPlayer";
import { Play, ChevronDown, Check, Plus, ThumbsUp } from "lucide-react";
import { TMDB_API_OPTIONS } from "../lib/utils";
import MuteButton from "./MuteButton";

const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w400";

interface InteractiveMediaCardProps {
  media: Media;
  mediaType?: "movie" | "tv";
  onHoverChange?: (hovered: boolean) => void;
  isMuted?: boolean;
  onMuteToggle?: () => void;
  activeCardId?: number | null;
  onActivate?: (id: number | null) => void;
}

export default function InteractiveMediaCard({
  media,
  mediaType = "movie",
  onHoverChange,
  isMuted = true,
  onMuteToggle,
  activeCardId,
  onActivate,
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
  const closeCooldown = useRef(false);
  const touchMoved = useRef(false);
  const backdropMoved = useRef(false);
  const [, setSearchParams] = useSearchParams();
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Close this card if another card becomes active or all cards are dismissed
  useEffect(() => {
    if (activeCardId !== media.id && isHovered) {
      handleMouseLeave();
    }
  }, [activeCardId]);



  function handleMouseEnter() {
    if (hoverTimeout.current || closeCooldown.current) return;
    hoverTimeout.current = setTimeout(async () => {
      hoverTimeout.current = null;
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
      onActivate?.(media.id);
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
    hoverTimeout.current = null;
    closeCooldown.current = true;
    setTimeout(() => { closeCooldown.current = false; }, 400);
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
      className="relative flex-shrink-0 w-[180px] sm:w-[calc((100%-4px)/2)] md:w-[calc((100%-8px)/3)] min-[800px]:w-[calc((100%-12px)/4)] 4xl:w-[calc((100%-16px)/5)] min-[1280px]:w-[calc((100%-20px)/6)]"
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') handleMouseEnter(); }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') handleMouseLeave(); }}
      onTouchStart={() => { touchMoved.current = false; }}
      onTouchMove={() => { touchMoved.current = true; }}
      onTouchEnd={(e) => {
        if (!isHovered && !touchMoved.current) {
          e.preventDefault();
          handleMouseEnter();
        }
      }}
    >
      {isHovered && (
        <div
          className="fixed inset-0 z-[1] sm:hidden"
          onTouchStart={() => { backdropMoved.current = false; }}
          onTouchMove={() => { backdropMoved.current = true; }}
          onTouchEnd={() => {
            if (!backdropMoved.current) {
              handleMouseLeave();
              onActivate?.(null);
            }
          }}
        />
      )}
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
          <div className="aspect-video relative overflow-hidden w-full">
            <TrailerPlayer
              mediaId={media.id}
              mediaType={mediaType}
              muted={isMuted}
              onPlay={() => setIsTrailerPlaying(true)}
              onEnd={() => setIsTrailerPlaying(false)}
            />
            {/* Poster cover */}
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
            <div
              className={`absolute right-[1.4em] bottom-[0.6em] z-20 ${!isTrailerPlaying ? "opacity-0 pointer-events-none delay-[2500ms]" : "opacity-100 delay-0"}`}
            >
              <MuteButton
                isMuted={isMuted}
                onToggle={() => onMuteToggle?.()}
                iconSize="1em"
              />
            </div>
            {/* Title overlay */}
            <div className="absolute bottom-[1em] left-[1.4em] text-white font-bold text-sm drop-shadow-lg">
              {title}
            </div>
          </div>

          <div className="text-[cqw] px-[1.4em] pb-[0.6em] pt-[0.3em] flex flex-col h-[40%] justify-between">
            <div className="flex items-center ml-[0.3em]">
              <div className="flex justify-between gap-2 ">
                <button className="bg-white rounded-full h-[2em] w-[2em] flex items-center justify-center hover:bg-white/80 cursor-pointer">
                  <Play
                    fill="black"
                    stroke="none"
                    style={{ width: "1em", height: "1em" }}
                  />
                </button>
                <button
                  onClick={() => setIsAdded((a) => !a)}
                  className="border border-gray-400 rounded-full h-[2em] w-[2em] text-white flex items-center justify-center hover:border-white cursor-pointer"
                >
                  {isAdded ? (
                    <Check
                      style={{ width: "1em", height: "1em" }}
                      strokeWidth={2}
                    />
                  ) : (
                    <Plus
                      style={{ width: "1em", height: "1em" }}
                      strokeWidth={2}
                    />
                  )}
                </button>
                <button
                  onClick={() => setIsLiked((a) => !a)}
                  className="border border-gray-400 rounded-full h-[2em] w-[2em] text-white flex items-center justify-center hover:border-white cursor-pointer"
                >
                  {isLiked ? (
                    <ThumbsUp
                      style={{ width: "0.75em", height: "0.75em" }}
                      fill="white"
                      strokeWidth={0}
                    />
                  ) : (
                    <ThumbsUp style={{ width: "0.75em", height: "0.75em" }} />
                  )}
                </button>
              </div>
              <button
                onClick={() => setSearchParams({ jbv: String(media.id) })}
                className="border border-gray-400 rounded-full h-[2em] w-[2em] flex items-center justify-center hover:border-white ml-auto cursor-pointer"
              >
                <ChevronDown className="text-white pt-[0.25em] px-[0.25em] w-full h-full" />
              </button>
            </div>
            <div className="flex items-center my-[1em] pl-[0.2em] gap-[0.4em] text-gray-400">
              {rating && (
                <span className="border border-gray-400 font-thin px-[0.2em] pb-[0.1em] pt-[0.06em] leading-none">
                  {rating}
                </span>
              )}
              {runtimeDisplay && (
                <span className="font-thin">{runtimeDisplay}</span>
              )}
              <span className="border border-gray-400 text-[0.4em] px-[0.5em]">
                HD
              </span>
            </div>
            <div className="flex mb-[2em] items-center text-white text-sm font-thin">
              Genre Tags • Quirky • Dark Comedy
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
