import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Media } from "../types";
import { TMDB_API_OPTIONS } from "../lib/utils";
import InteractiveMediaCard from "../components/InteractiveMediaCard";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const searchMedia = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}`,
          TMDB_API_OPTIONS,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }

        const data = await response.json();
        setResults(data.results || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    searchMedia();
  }, [query]);

  return (
    <div className="px-8 mt-[70px] text-white">
      <h1 className="text-3xl font-bold">Search Results</h1>
      {query && (
        <p className="mt-4 text-gray-400">
          Showing results for:{" "}
          <span className="text-white font-semibold">"{query}"</span>
        </p>
      )}

      {loading && <p className="mt-4">Loading...</p>}

      {error && <p className="mt-4 text-red-500">Error: {error}</p>}

      {!loading && !error && results.length === 0 && query && (
        <p className="mt-4 text-gray-400">No results found</p>
      )}

      {!loading && results.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 min-[800px]:grid-cols-4 4xl:grid-cols-5 min-[1920px]:grid-cols-6 gap-2">
          {results
            .filter((media) => media.backdrop_path)
            .map((media) => (
              <div key={media.id} className="[&>div]:w-full">
                <InteractiveMediaCard
                  media={media}
                  mediaType={media.media_type === "tv" ? "tv" : "movie"}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
