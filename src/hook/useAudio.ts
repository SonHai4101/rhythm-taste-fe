import { keys } from "@/constants/keys";
import { apiService } from "@/services/apiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useDeleteAudio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiService.audio.deleteAudio(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.audios] });
    },
  });
};
