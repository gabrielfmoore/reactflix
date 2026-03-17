import { Card } from "@/components/ui/Card";
import type { Media } from "../types";
const TMDB_IMAGES_ASSET_URL = "https://image.tmdb.org/t/p/w500";

interface MediaCardProps {
  media: Media;
  rank?: number;
}

const TrendingMediaCard = ({ media, rank }: MediaCardProps) => {
  return (
    <Card className="group relative overflow-visible cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl outline-blue-200 p-0 border-0 w-[7rem] h-[9.8rem]">
      {rank && (
        <div className="absolute bottom-0 -left-2 text-[#141414] font-bold text-6xl z-20 scale-x-103 [font-family:var(--font-rank)] [-webkit-text-stroke:1px_white] [paint-order:stroke_fill] [filter:drop-shadow(4px_4px_6px_rgba(20,20,20,1))]">
          {rank}
        </div>
      )}
      <img
        src={media?.poster_path ? TMDB_IMAGES_ASSET_URL + media?.
            poster_path : 'https://via.placeholder.com/500x750?text=No+Image'}
        alt={media?.title || media?.name}
        className="w-full h-full object-cover z-10 rounded-sm"
      />
    </Card>
  );
};

export default TrendingMediaCard;
