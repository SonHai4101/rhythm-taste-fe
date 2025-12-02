import { keys } from "@/constants/keys";
import { apiService } from "@/services/apiService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useDeleteSongById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiService.song.deleteSongById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.songs] });
    },
  });
};
