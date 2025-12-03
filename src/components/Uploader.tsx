import { useUploadFiles } from "@better-upload/client";
import { UploadButton } from "./upload-button";
import useAuthStore from "../store/useAuthStore";
import { parseBlob } from "music-metadata-browser";
import { apiService } from "@/services/apiService";
import { useQueryClient } from "@tanstack/react-query";
import { keys } from "@/constants/keys";

export function Uploader({
  type = "default",
}: {
  type?: "default" | "custom";
}) {
  const { accessToken } = useAuthStore();
  const queryClient = useQueryClient();
  const { control } = useUploadFiles({
    route: "audio",
    api: `${import.meta.env.VITE_URL}/upload`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    onUploadComplete: async ({ files }) => {
      try {
        // Process each uploaded file
        for (const fileInfo of files) {
          // Get the file key from the upload response
          const key = fileInfo.objectInfo.key;

          if (!key) {
            console.error("File key not found in upload response");
            continue;
          }

          // Fetch the audio record from the backend using the key
          const audio = await apiService.audio.getAudioByKey(key);

          // Parse metadata from the audio file
          const metadata = await parseBlob(fileInfo.raw);

          console.log("meta data", metadata);

          const title =
            metadata.common.title || fileInfo.name.replace(/\.[^.]+$/, "");
          const duration = metadata.format.duration
            ? Math.round(metadata.format.duration)
            : null;
          const artist =
            metadata.common.artist || metadata.common.albumartist || null;
          const album = metadata.common.album || null;

          const albumCover = metadata.common.picture?.[0] || null;
          let coverBase64 = null;
          if (albumCover) {
            const base64 = btoa(
              new Uint8Array(albumCover.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            coverBase64 = `data: ${albumCover.format};base64,${base64}`;
          }

          // Create the song
          await apiService.song.createSong({
            title,
            duration,
            artist,
            album,
            albumCover: coverBase64,
            audioId: audio.id,
          });

          console.log(`Song "${title}" created successfully`);
        }

        // Invalidate songs query to refresh the list
        queryClient.invalidateQueries({ queryKey: [keys.songs] });
      } catch (error) {
        console.error("Failed to create song:", error);
      }
    },
  });
  return <UploadButton type={type} control={control} accept="audio/mpeg" />;
}
