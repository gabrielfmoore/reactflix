import { useEffect, useState } from "react";
import type { Media } from "../types";
import Slider from "./Slider";
import InteractiveMediaCard from "./InteractiveMediaCard";
import { TMDB_API_OPTIONS } from "@/lib/utils";
import SkeletonCard from "./SkeletonCard";

interface SliderRowProps {
  title: string;
  endpoint: string;
  mediaType?: "movie" | "tv";
  onCardActive?: (active: boolean) => void;
  isMuted?: boolean;
  onMuteToggle?: () => void;
}

export default function SliderRow({
  title,
  endpoint,
  mediaType = "movie",
  onCardActive,
  isMuted,
  onMuteToggle,
}: SliderRowProps) {
  const [items, setItems] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCount, setHoveredCount] = useState(0);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  function handleHoverChange(hovered: boolean) {
    setHoveredCount((n) => Math.max(0, n + (hovered ? 1 : -1)));
  }

  useEffect(() => {
    onCardActive?.(hoveredCount > 0);
  }, [hoveredCount > 0]);

  function closeMobileCard() {
    setActiveCardId(null);
    setHoveredCount(0);
  }

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3${endpoint}`,
          TMDB_API_OPTIONS,
        );
        const data = await res.json();
        setItems(data.results || []);
      } catch (err) {
        console.error(`Failed to fetch ${endpoint}:`, err);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, [endpoint]);

  if (loading) {
    return (
      <div className="my-[3vw]">
        <div className="h-4 w-32 bg-[#2f2f2f] animate-pulse rounded mx-[4%] mb-[0.5vw]" />
        <Slider>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </Slider>
      </div>
    )
  }
    if (items.length === 0) return null;

  return (
      <div className={`group/row relative my-[3vw] ${hoveredCount > 0 ? 'z-10' : 'z-0'}`}>
      <h2 className="text-white text-[12px] font-[500] px-[4%] mb-[0.5vw]">{title}</h2>
      {hoveredCount > 0 && (
        <div
          className="fixed inset-0 z-[1] sm:hidden"
          onTouchEnd={(e) => { e.stopPropagation(); closeMobileCard(); }}
        />
      )}
      <Slider hideArrows={hoveredCount > 0}>
        {items.map((item) => (
          <InteractiveMediaCard
            key={item.id}
            media={item}
            mediaType={mediaType}
            onHoverChange={handleHoverChange}
            isMuted={isMuted}
            onMuteToggle={onMuteToggle}
            activeCardId={activeCardId}
            onActivate={(id) => setActiveCardId(id)}
          />
        ))}
      </Slider>
    </div>
  );
}