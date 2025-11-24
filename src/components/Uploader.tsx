import { useUploadFile } from "@better-upload/client";
import { UploadButton } from "./upload-button";
import useAuthStore from "../store/useAuthStore";

export function Uploader() {
  const { accessToken } = useAuthStore();
  const { control } = useUploadFile({
    route: "audio",
    api: `${import.meta.env.VITE_URL}/upload`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return <UploadButton control={control} accept="audio/*" />;
}
