import { useRef, useState, useEffect, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderProps {
  children: ReactNode;
  hideArrows?: boolean;
  gap?: number;
}

export default function Slider({ children, hideArrows = false, gap = 4 }: SliderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startOffset: number; locked: boolean; startY: number } | null>(null);

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

  // Touch drag handlers
  function handleTouchStart(e: React.TouchEvent) {
    dragRef.current = {
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      startOffset: offset,
      locked: false,
    };
  }

  function handleTouchMove(e: React.TouchEvent) {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = e.touches[0].clientX - drag.startX;
    const dy = e.touches[0].clientY - drag.startY;
    if (!drag.locked && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
      if (Math.abs(dy) > Math.abs(dx)) { dragRef.current = null; return; }
      drag.locked = true;
      setIsDragging(true);
    }
    if (drag.locked) {
      e.preventDefault();
      setOffset(Math.max(0, Math.min(maxOffset, drag.startOffset - dx)));
    }
  }

  function handleTouchEnd() {
    dragRef.current = null;
    setIsDragging(false);
  }

  function scroll(direction: "left" | "right") {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;
    const firstCard = track.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard?.offsetWidth ?? 200;
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
          className="hidden sm:flex absolute left-0 top-0 bottom-0 z-20 bg-[#141414]/60 items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity cursor-pointer"
        >
          <ChevronLeft className="text-white" size={32} />
        </button>
      )}

      <div
        ref={wrapperRef}
        className="overflow-x-clip overflow-y-visible touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          className={`flex px-[4%] ${isDragging ? '' : 'transition-transform duration-500 ease-in-out'}`}
          style={{ transform: `translateX(-${offset}px)`, gap: `${gap}px` }}
        >
          {children}
        </div>
      </div>

      {canScrollRight && !hideArrows && (
        <button
          onClick={() => scroll("right")}
          className="hidden sm:flex absolute right-0 top-0 bottom-0 z-20 w-10 bg-[#141414]/60 items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity cursor-pointer"
        >
          <ChevronRight className="text-white" size={32} />
        </button>
      )}
    </div>
  );
}

