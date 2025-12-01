export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumCover: string;
  duration: number;
  audioId: string;
  createdAt: string;
  updatedAt: string;
  audio: Audio;
}

export interface Audio {
  id: string;
  url: string;
  key: string;
  createdAt: string;
  updatedAt: string;
}
