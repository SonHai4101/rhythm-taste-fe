import { axiosInstance } from "../lib/axios";

export interface Song {
  id: string;
  title: string;
  artist: string | null;
  album: string | null;
  albumCover: string| null
  duration: number | null;
  createdAt: string;
  updatedAt: string;
  audio: {
    id: string;
    url: string;
    key: string;
    createdAt: string;
    updatedAt: string;
  } | null;
}

export interface CreateSongInput {
  title: string;
  artist?: string | null;
  album?: string | null;
  albumCover?: string | null;
  duration?: number | null;
  audioId: string;
}

export interface UpdateSongInput {
  title?: string;
  artist?: string;
  album?: string;
  duration?: number;
  audioUrl?: string;
  audioKey?: string;
}

export interface GetAllSongsParams {
  page?: number;
  limit?: number;
  artist?: string;
  album?: string;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedSongsResponse {
  songs: Song[];
  pagination: PaginationInfo;
}

export const songService = {
  getAllSongs: async (
    params?: GetAllSongsParams
  ): Promise<PaginatedSongsResponse> => {
    const response = await axiosInstance.get<PaginatedSongsResponse>("/song", {
      params: {
        page: params?.page,
        limit: params?.limit,
        artist: params?.artist,
        album: params?.album,
      },
    });
    return response.data;
  },

  getSongById: async (id: string): Promise<Song> => {
    const response = await axiosInstance.get<Song>(`/song/${id}`);
    return response.data;
  },

  createSong: async (data: CreateSongInput): Promise<Song> => {
    const response = await axiosInstance.post<Song>("/song", data);
    return response.data;
  },

  updateSong: async (id: string, data: UpdateSongInput): Promise<Song> => {
    const response = await axiosInstance.put<Song>(`/song/${id}`, data);
    return response.data;
  },

  deleteSong: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/song/${id}`);
  },

  searchSongs: async (query: string): Promise<Song[]> => {
    const response = await axiosInstance.get<Song[]>("/song/search", {
      params: { q: query },
    });
    return response.data;
  },
};
