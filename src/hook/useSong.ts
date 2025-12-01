import { keys } from "@/constants/keys";
import { apiService } from "@/services/apiService";
import { useQuery } from "@tanstack/react-query";

export const useGetAllSongs = () => {
  return useQuery({
    queryKey: [keys.songs],
    queryFn: () => apiService.song.getAllSongs(),
  });
};

export const useGetSongById = (id: string) => {
  return useQuery({
    queryKey: [keys.song],
    queryFn: () => apiService.song.getSongById(id),
  });
};
