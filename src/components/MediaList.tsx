import type { Media, MediaListProps } from '../types';
import TrendingMediaCard from './TrendingMediaCard';

const MediaList = ({ mediaItems }: MediaListProps) => {
  return (
    <div className="relative">
      <ul className="flex overflow-x-scroll overflow-y-visible gap-8 px-4 md:px-6 lg:px-8 py-4 scrollbar-hide relative">
        {mediaItems.slice(10).map((media: Media, index: number) => (
          <li key={media.id} className="flex-shrink-0">
            <TrendingMediaCard media={media} rank={index + 1} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MediaList;
