import { useEffect, useState, useRef } from "react";
import { TMDB_API_OPTIONS } from "@/lib/utils";

// Declare YouTube types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface TrailerPlayerProps {
  mediaId?: number;
  mediaType?: "movie" | "tv";
  youtubeKey?: string;
  startTime?: number;
  duration?: number;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
  onPlay?: () => void;
  onEnd?: () => void;
}

interface Video {
  key: string;
  type: string;
  site: string;
  official: boolean;
}

export default function TrailerPlayer({
  mediaId,
  mediaType,
  youtubeKey,
  startTime = 0,
  duration,
  autoplay = true,
  muted = true,
  controls = false,
  className = "",
  onPlay,
  onEnd,
}: TrailerPlayerProps) {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasPlayedRef = useRef(false);
  const onPlayRef = useRef(onPlay);
  const onEndRef = useRef(onEnd);

  // Keep refs current on every render
  useEffect(() => {
    onPlayRef.current = onPlay;
    onEndRef.current = onEnd;
  });

  // Load YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);

  // Handle mute/unmute when prop changes
  useEffect(() => {
    if (playerRef.current && playerRef.current.mute && playerRef.current.unMute) {
      if (muted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
      }
    }
  }, [muted]);

  useEffect(() => {
    // If youtubeKey is provided, use it directly
    if (youtubeKey) {
      setTrailerKey(youtubeKey);
      return;
    }

    // Otherwise, fetch from TMDB
    if (!mediaId || !mediaType) {
      setError(true);
      return;
    }

    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${mediaId}/videos`,
          TMDB_API_OPTIONS,
        );

        const data = await response.json();
        // Cleaned: removed debug console.log

        // Find official trailer, or any trailer, or any video from YouTube
        const trailer =
          data.results?.find(
            (video: Video) =>
              video.type === "Trailer" &&
              video.site === "YouTube" &&
              video.official,
          ) ||
          data.results?.find(
            (video: Video) =>
              video.type === "Trailer" && video.site === "YouTube",
          ) ||
          data.results?.find((video: Video) => video.site === "YouTube");

        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching trailer:", err);
        setError(true);
      }
    };

    fetchTrailer();
  }, [mediaId, mediaType, youtubeKey]);

  // Create YouTube player when trailerKey is available
  useEffect(() => {
    if (!trailerKey || !containerRef.current) return;

    // Reset for new player instance
    hasPlayedRef.current = false;

    const createPlayer = () => {
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player(containerRef.current, {
          videoId: trailerKey,
          playerVars: {
            autoplay: autoplay ? 1 : 0,
            start: startTime,
            controls: controls ? 1 : 0,
            rel: 0,
            modestbranding: 1,
            showinfo: 0,
            fs: 0,
            disablekb: 1,
            iv_load_policy: 3,
            mute: muted ? 1 : 0,
          },
          events: {
            onReady: (event: any) => {
              if (muted) {
                event.target.mute();
              }
            },
            onStateChange: (event: any) => {
              if (event.data === 1 && !hasPlayedRef.current) {
                hasPlayedRef.current = true;
                if (duration) {
                  setTimeout(() => {
                    playerRef.current?.pauseVideo?.();
                    onEndRef.current?.();
                  }, (duration - startTime - 1) * 1000);
                }
                setTimeout(() => onPlayRef.current?.(), 300);
              }
              // Video ended naturally
              if (event.data === 0) {
                onEndRef.current?.();
              }
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [trailerKey, autoplay, controls, startTime, duration]);

  if (error || !trailerKey) {
    return (
      <div
        className={`w-full aspect-video bg-gray-900 flex items-center justify-center ${className}`}
      >
        <p className="text-white">No trailer available</p>
      </div>
    );
  }

  return (
    <div className={`w-full aspect-video relative ${className}`}>
      <div ref={containerRef} className="w-full h-full" />
      {/* Block iframe interaction */}
      <div className="absolute inset-0 z-20 pointer-events-auto" />
    </div>
  );
}
