import { useEffect, useState } from "react";
import type { Media } from "../types";
import Slider from "./Slider";
import InteractiveMediaCard from "./InteractiveMediaCard";
import { TMDB_API_OPTIONS } from "@/lib/utils";

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
  const [hoveredCount, setHoveredCount] = useState(0);

  function handleHoverChange(hovered: boolean) {
    setHoveredCount((n) => Math.max(0, n + (hovered ? 1 : -1)));
  }

  useEffect(() => {
    onCardActive?.(hoveredCount > 0);
  }, [hoveredCount > 0]);

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
      }
    }
    fetchItems();
  }, [endpoint]);

  if (items.length === 0) return null;

  return (
      <div className={`group/row relative my-[3vw] ${hoveredCount > 0 ? 'z-10' : 'z-0'}`}>
      <h2 className="text-white text-[12px] font-[500] px-[4%] mb-[0.5vw]">{title}</h2>
      <Slider hideArrows={hoveredCount > 0}>
        {items.map((item) => (
          <InteractiveMediaCard
            key={item.id}
            media={item}
            mediaType={mediaType}
            onHoverChange={handleHoverChange}
            isMuted={isMuted}
            onMuteToggle={onMuteToggle}
          />
        ))}
      </Slider>
    </div>
  );
}