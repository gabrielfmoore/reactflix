import { useRef, useState, useEffect, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderProps {
  children: ReactNode;
  hideArrows?: boolean;
}

export default function Slider({ children, hideArrows = false }: SliderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);

  const canScrollLeft = offset > 0;
  const canScrollRight = offset < maxOffset - 1;

  useEffect(() => {
    function recalc() {
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!wrapper || !track) return;
      setMaxOffset(Math.max(0, track.scrollWidth - wrapper.clientWidth));
    }
    recalc();
    const ro = new ResizeObserver(recalc);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  // Clamp offset when the viewport grows and maxOffset shrinks
  useEffect(() => {
    setOffset((prev) => Math.min(prev, maxOffset));
  }, [maxOffset]);

  function scroll(direction: "left" | "right") {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;
    const firstCard = track.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard?.offsetWidth ?? 200;
    const gap = 4;
    const n = Math.max(1, Math.round(wrapper.clientWidth / (cardWidth + gap)));
    const amount = n * (cardWidth + gap);
    setOffset((prev) =>
      direction === "left"
        ? Math.max(0, prev - amount)
        : Math.min(maxOffset, prev + amount),
    );
  }

  return (
    <div className="group/slider relative">
      {canScrollLeft && !hideArrows && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-20 bg-[#141414]/60 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity cursor-pointer"
        >
          <ChevronLeft className="text-white" size={32} />
        </button>
      )}

      {/* overflow-x: clip clips horizontally without creating a scroll container.
          Unlike overflow-x: hidden, it does NOT force overflow-y to auto/clip,
          so expanded hover cards can overflow vertically without being clipped. */}
      <div ref={wrapperRef} className="overflow-x-clip overflow-y-visible">
        <div
          ref={trackRef}
          className="flex gap-[4px] px-[4%] transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {children}
        </div>
      </div>

      {canScrollRight && !hideArrows && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-20 w-10 bg-[#141414]/60 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity cursor-pointer"
        >
          <ChevronRight className="text-white" size={32} />
        </button>
      )}
    </div>
  );
}

