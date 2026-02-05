export interface Anime {
  rank: string;
  title: string;
  score: string;
  type: string;
  release: string;
  members: string;
  thumbnail: string;
  link: string;
}

export type SortOption = 'rank' | 'score' | 'popularity';

export interface AnimeState {
  data: Anime[];
  loading: boolean;
  error: string | null;
}
