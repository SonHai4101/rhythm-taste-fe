import { useUploadFile } from "@better-upload/client";
import { UploadButton } from "./upload-button";
import useAuthStore from "../store/useAuthStore";
import { useState } from "react";
import { songService } from "@/services/songService";
import { useToast } from "@/hooks/use-toast";

interface BetterUploadResponse {
  files: Array<{
    signedUrl: string;
    file: {
      name: string;
      size: number;
      type: string;
      objectInfo: {
        key: string;
        metadata: Record<string, any>;
      };
    };
  }>;
  metadata: Record<string, any>;
}

interface UploaderProps {
  onUploadComplete?: () => void;
  autoCreateSong?: boolean;
}

export function Uploader({
  onUploadComplete,
  autoCreateSong = false,
}: UploaderProps) {
  const { accessToken } = useAuthStore();
  const { toast } = useToast();
  const [isCreatingSong, setIsCreatingSong] = useState(false);

  const { control } = useUploadFile({
    route: "audio",
    api: `${import.meta.env.VITE_URL}/upload`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    onSuccess: async (response) => {
      console.log("Upload successful:", response);

      if (!autoCreateSong) {
        toast({
          title: "Upload successful",
          description: "Audio file uploaded to storage",
        });
        onUploadComplete?.();
        return;
      }

      // Extract the key and URL from Better Upload response
      const uploadData = response as unknown as BetterUploadResponse;
      const fileData = uploadData.files[0];
      const audioKey = fileData.file.objectInfo.key;
      const audioUrl = fileData.signedUrl;
      const fileName = fileData.file.name.replace(/\.[^/.]+$/, ""); // Remove extension

      try {
        setIsCreatingSong(true);

        // Automatically create a song with the uploaded audio
        await songService.createSong({
          title: fileName,
          audioUrl,
          audioKey,
        });

        toast({
          title: "Success",
          description: "Song created successfully",
        });

        onUploadComplete?.();
      } catch (error) {
        console.error("Failed to create song:", error);
        toast({
          title: "Error",
          description: "Failed to create song. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsCreatingSong(false);
      }
    },
    onError: (error) => {
      console.error("Upload failed:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload audio file. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <UploadButton
      control={control}
      accept="audio/*"
      disabled={isCreatingSong}
    />
  );
}

// Alternative: Uploader that exposes the data for manual song creation
export function UploaderWithCallback({
  onUploadComplete,
}: {
  onUploadComplete?: (data: {
    audioUrl: string;
    audioKey: string;
    fileName: string;
  }) => void;
}) {
  const { accessToken } = useAuthStore();
  const { toast } = useToast();

  const { control } = useUploadFile({
    route: "audio",
    api: `${import.meta.env.VITE_URL}/upload`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    onSuccess: (response) => {
      console.log("Upload successful:", response);

      // Extract the key and URL from Better Upload response
      const uploadData = response as unknown as BetterUploadResponse;
      const fileData = uploadData.files[0];
      const audioKey = fileData.file.objectInfo.key;
      const audioUrl = fileData.signedUrl;
      const fileName = fileData.file.name.replace(/\.[^/.]+$/, "");

      // Pass the data to the parent component
      onUploadComplete?.({ audioUrl, audioKey, fileName });

      toast({
        title: "Upload successful",
        description: "Audio file uploaded. You can now add song details.",
      });
    },
    onError: (error) => {
      console.error("Upload failed:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload audio file. Please try again.",
        variant: "destructive",
      });
    },
  });

  return <UploadButton control={control} accept="audio/*" />;
}
