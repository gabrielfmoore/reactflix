import { useEffect, useState } from "react";
import type { Media } from "../types";
import Slider from "./Slider";
import { TMDB_API_OPTIONS } from "@/lib/utils";

const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function TrendingNow() {
  const [items, setItems] = useState<Media[]>([]);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/trending/tv/week",
          TMDB_API_OPTIONS,
        );
        const data = await res.json();
        setItems((data.results || []).slice(0, 10));
      } catch (err) {
        console.error("Failed to fetch trending:", err);
      }
    }
    fetchTrending();
  }, []);

  if (items.length === 0) return null;

  return (
    <section aria-label="Trending Now" className="top-full relative z-0 my-[3vw]">
      <h2 className="text-white font-black text-lg sm:text-[1.4vw] font-[500] px-[4%] mb-2">
        Trending Now
      </h2>
      <Slider gap={30}>
        {items.map((item, index) => {
          const name = item.title || item.name || "Untitled";
          return (
            <div
              key={item.id}
              aria-label={`${name}, trending number ${index + 1}`}
              className="relative flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded-sm"
            >
              <div className="relative w-[118px] h-[165px] 3xl:h-[200px] 3xl:w-[140px]">
                <div aria-hidden="true" className="absolute bottom-0 -left-2 text-[#141414] font-bold text-6xl z-20 scale-x-103 [font-family:var(--font-rank)] [-webkit-text-stroke:1px_white] [paint-order:stroke_fill] [filter:drop-shadow(4px_4px_6px_rgba(20,20,20,1))]">
                  {index + 1}
                </div>
                <img
                  src={
                    item.poster_path
                      ? TMDB_IMAGE_URL + item.poster_path
                      : undefined
                  }
                  alt=""
                  className="w-full h-full object-cover z-10 rounded-sm"
                />
              </div>
            </div>
          );
        })}
      </Slider>
    </section>
  );
}
