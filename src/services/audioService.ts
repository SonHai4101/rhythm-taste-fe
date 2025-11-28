import { axiosInstance } from "../lib/axios";

export interface Audio {
  id: string;
  key: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export const audioService = {
  getAudioByKey: async (key: string): Promise<Audio> => {
    const response = await axiosInstance.get<Audio>(`/audio/key/${key}`);
    return response.data;
  },
};
