import type { Audio, Pagination, Song } from "@/constants/types";
import { axiosInstance } from "@/lib/axios";

export const apiService = {
  song: {
    getAllSongs: (): Promise<{
      data: Song[];
      pagination: Pagination;
    }> => axiosInstance.get("/song").then((res) => res.data),
    getSongById: (id: string): Promise<Song> =>
      axiosInstance.get(`/song/${id}`).then((res) => res.data),
    createSong: (body: {
      title: string;
      artist?: string | null;
      album?: string | null;
      albumCover?: string | null;
      duration?: number | null;
      audioId: string;
    }) => axiosInstance.post("/song", body),
    deleteSongById: (id: string) => axiosInstance.delete(`/song/${id}`),
  },
  audio: {
    getAudioByKey: (key: string): Promise<Audio> =>
      axiosInstance.get(`/audio/key/${key}`).then((res) => res.data),
    deleteAudio: (id: string) => axiosInstance.delete(`/audio/delete/${id}`),
  },
};
