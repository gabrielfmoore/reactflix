import TrailerPlayer from "@/components/TrailerPlayer";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import widePoster from "../assets/interstellar_poster_wide.webp";
import { Play, Info } from "lucide-react";
import MuteButton from "@/components/MuteButton";
import SliderRow from "@/components/SliderRow";
import MediaDetails from "@/components/MediaDetails";

const INTERSTELLAR_ID = 157336;

const Browse = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isTitleAnimated, setIsTitleAnimated] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCardRows, setActiveCardRows] = useState(0);

  function handleCardActive(active: boolean) {
    setActiveCardRows((n) => Math.max(0, n + (active ? 1 : -1)));
  }

  const detailsOpen = !!searchParams.get("jbv");
  const heroMuted = isMuted || activeCardRows > 0 || detailsOpen;

  function handlePlay() {
    setIsVideoPlaying(true);
    setTimeout(() => setIsTitleAnimated(true), 3000);
  }

  function handleEnd() {
    setIsVideoPlaying(false);
    setIsTitleAnimated(false);
  }

  return (
    <div>
      <div className="overflow-hidden relative z-0">
        <div className="absolute z-0 top-0 w-full -translate-y-[8vw]">
          <TrailerPlayer
            mediaId={INTERSTELLAR_ID}
            mediaType="movie"
            startTime={0}
            duration={132}
            muted={heroMuted}
            onPlay={handlePlay}
            onEnd={handleEnd}
          />
        </div>
        <div
          className={`relative z-10 pointer-events-none transition-opacity duration-1000 ${isVideoPlaying ? "opacity-0" : "opacity-100"}`}
        >
          <img src={widePoster} alt="Interstellar Poster" className="w-full" />
          <div className="absolute w-full h-[20%] bottom-0 bg-[linear-gradient(to_top,rgba(20,20,20,.9)_10%,transparent)]"></div>
        </div>
        <div className="z-20 w-full absolute top-0 left-0 right-[26%] bottom-0 bg-[linear-gradient(90deg,rgba(20,20,20,.8)_8%,transparent)]"></div>
        <div className="z-30 absolute flex justify-center items-center h-[2.7vw] right-0 bottom-[34%] text-white">
          <MuteButton isMuted={isMuted} onToggle={() => setIsMuted(!isMuted)} />
          <div className=" w-[0.4vh] h-full bg-white ml-2"></div>
          <div className="flex justify-center items-center text-[1.1vw] h-full pl-1 pr-[4vw] bg-gray-600/70 font-thin whitespace-nowrap">
            PG-13
          </div>
        </div>
        <div className="z-30 absolute bottom-[38%] left-[4%] top-0 justify-end w-[40%] flex flex-col">
          <div className="flex flex-col text-white">
            <img
              src="https://image.tmdb.org/t/p/original/zEewiIVx9rDfc1HahWPNk4uyJdP.png"
              alt="Interstellar Logo"
              className={`transition-all -translate-x-[0.8vw] duration-1000 ${isTitleAnimated ? "w-[27vw] translate-y-[8vw]" : "w-full translate-y-[2vw]"}`}
            />
            <p
              className={`text-[1.3vw] font-thin leading-[1.3] transition-all duration-800 mt-[1vw] ${isTitleAnimated ? "opacity-0 translate-y-[1.5vw]" : "opacity-100 translate-y-0"}`}
            >
              The adventures of a group of explorers who make use of a newly
              discovered wormhole to surpass the limitations on human space
              travel and conquer the vast distances involved in an interstellar
              voyage.
            </p>
            <div className="@container flex mt-[2vh] gap-[4%] h-[6vw] md:h-[4.5vw] w-[74%] md:w-[58%] lg:w-[40%] lg:h-[3.3vw] font-[600]">
              <button className="flex-1 h-full flex justify-center items-center gap-[0.4em] px-[11%] bg-white text-black text-[8cqw] rounded hover:bg-white/70">
                <Play className="h-[1.8em] md:h-[1.1em] w-[1.8em] md:w-[1.1em]" fill="currentColor" stroke="none"/>
                Play
              </button>
              <button
                onClick={() => setSearchParams({ jbv: String(INTERSTELLAR_ID), type: "movie" })}
                className="flex-1 h-full flex justify-center items-center gap-[0.4em] px-[10%] mr-[4em] bg-[#6d6d6e]/70 text-white whitespace-nowrap text-[8cqw] rounded hover:bg-[#6d6d6e]/30"
              >
                <Info className="h-[1.7em] md:h-[1.5em] w-[1.7em] md:w-[1.5em]" />
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-20 -mt-[16vw]">
        <SliderRow title="Trending Now" endpoint="/trending/movie/week" onCardActive={handleCardActive} isMuted={isMuted} onMuteToggle={() => setIsMuted((m) => !m)} />
        <SliderRow title="Top Rated" endpoint="/movie/top_rated" onCardActive={handleCardActive} isMuted={isMuted} onMuteToggle={() => setIsMuted((m) => !m)} />
        <SliderRow title="Comedies" endpoint="/discover/movie?with_genres=35" onCardActive={handleCardActive} isMuted={isMuted} onMuteToggle={() => setIsMuted((m) => !m)} />
        <SliderRow title="Popular on Reactflix" endpoint="/movie/popular" onCardActive={handleCardActive} isMuted={isMuted} onMuteToggle={() => setIsMuted((m) => !m)} />
        <SliderRow title="Horror" endpoint="/discover/movie?with_genres=27" onCardActive={handleCardActive} isMuted={isMuted} onMuteToggle={() => setIsMuted((m) => !m)} />
        <SliderRow
          title="TV Dramas"
          endpoint="/discover/tv?with_genres=18"
          mediaType="tv"
          onCardActive={handleCardActive}
          isMuted={isMuted}
          onMuteToggle={() => setIsMuted((m) => !m)}
        />
      </div>
      <MediaDetails />
    </div>
  );
};

export default Browse;
