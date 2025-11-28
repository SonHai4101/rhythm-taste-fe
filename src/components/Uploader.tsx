import { useUploadFile } from "@better-upload/client";
import { UploadButton } from "./upload-button";
import useAuthStore from "../store/useAuthStore";
import { parseBlob } from "music-metadata-browser";
import { songService } from "../services/songService";
import { audioService } from "../services/audioService";

export function Uploader() {
  const { accessToken } = useAuthStore();
  const { control } = useUploadFile({
    route: "audio",
    api: `${import.meta.env.VITE_URL}/upload`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    onUploadComplete: async ({ file }) => {
      try {
        // Get the file key from the upload response
        const key = file.objectInfo.key;

        if (!key) {
          console.error("File key not found in upload response");
          return;
        }

        // Fetch the audio record from the backend using the key
        const audio = await audioService.getAudioByKey(key);

        // Parse metadata from the audio file
        const metadata = await parseBlob(file.raw);

        console.log("meta data", metadata);
        

        const title =
          metadata.common.title || file.name.replace(/\.[^.]+$/, "");
        const duration = metadata.format.duration
          ? Math.round(metadata.format.duration)
          : null;
        const artist =
          metadata.common.artist || metadata.common.albumartist || null;
        const album = metadata.common.album || null;

        // Create the song
        await songService.createSong({
          title,
          duration,
          artist,
          album,
          audioId: audio.id,
        });

        console.log("Song created successfully");
      } catch (error) {
        console.error("Failed to create song:", error);
      }
    },
  });
  return <UploadButton control={control} accept="audio/*" />;
}
