import type { Song } from "@/constants/types";
import { axiosInstance } from "@/lib/axios";

export const apiService = {
  song: {
    getAllSongs: (): Promise<Song[]> =>
      axiosInstance.get("/song").then((res) => res.data),
    getSongById: (id: string): Promise<Song> =>
      axiosInstance.get(`/song/${id}`).then((res) => res.data),
  },
};
