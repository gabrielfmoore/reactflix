export type Media = {
  id: number;
  title?: string; // For movies
  name?: string; // For TV shows
  poster_path: string | null;
  backdrop_path?: string | null;
  overview: string;
  release_date?: string; // For movies
  first_air_date?: string; // For TV shows
  popularity: number;
  vote_average: number;
  genre_ids: number[];
  media_type?: string;
};