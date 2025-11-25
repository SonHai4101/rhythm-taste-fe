import { axiosInstance } from "../lib/axios";

export interface Song {
  id: string;
  title: string;
  artist: string | null;
  album: string | null;
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
  artist?: string;
  album?: string;
  duration?: number;
  audioUrl?: string;
  audioKey?: string;
}

export interface UpdateSongInput {
  title?: string;
  artist?: string;
  album?: string;
  duration?: number;
  audioUrl?: string;
  audioKey?: string;
}

export const songService = {
  getAllSongs: async (): Promise<Song[]> => {
    const response = await axiosInstance.get<Song[]>("/song");
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
