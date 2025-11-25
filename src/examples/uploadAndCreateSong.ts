// Example: How to handle Better Upload response and create song

import { songService } from "@/services/songService";

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

interface SongFormData {
  title: string;
  artist?: string;
  album?: string;
  duration?: number;
}

/**
 * Upload audio file and create song record
 * @param audioFile - The audio file to upload
 * @param songData - Song metadata (title, artist, album, duration)
 * @returns Created song object
 */
export async function uploadAndCreateSong(
  audioFile: File,
  songData: SongFormData
) {
  try {
    // Step 1: Upload to R2 using Better Upload
    const formData = new FormData();
    formData.append("audio", audioFile);

    const uploadResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formData,
      }
    );

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload audio file");
    }

    const uploadData: BetterUploadResponse = await uploadResponse.json();

    // Step 2: Extract the key and URL from the response
    const fileData = uploadData.files[0];
    const audioKey = fileData.file.objectInfo.key;
    const audioUrl = fileData.signedUrl;

    console.log("Upload successful:", { audioKey, audioUrl });

    // Step 3: Create the song with audio data
    const song = await songService.createSong({
      ...songData,
      audioUrl,
      audioKey,
    });

    console.log("Song created:", song);
    return song;
  } catch (error) {
    console.error("Error uploading and creating song:", error);
    throw error;
  }
}

// Example usage in a component:
/*
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!audioFile) {
    alert("Please select an audio file");
    return;
  }

  try {
    setLoading(true);
    
    const song = await uploadAndCreateSong(audioFile, {
      title: formData.title,
      artist: formData.artist,
      album: formData.album,
      duration: formData.duration,
    });
    
    console.log("Song created successfully:", song);
    
    // Refresh the song list or navigate
    fetchSongs();
    resetForm();
    
  } catch (error) {
    console.error("Failed to create song:", error);
    alert("Failed to create song. Please try again.");
  } finally {
    setLoading(false);
  }
};
*/

// Alternative: Update existing Uploader component
/*
// In your Uploader component:

const handleUploadComplete = async (response: BetterUploadResponse) => {
  const fileData = response.files[0];
  const audioKey = fileData.file.objectInfo.key;
  const audioUrl = fileData.signedUrl;
  
  // Option 1: Create song immediately
  await songService.createSong({
    title: fileData.file.name.replace(/\.[^/.]+$/, ''), // Remove extension
    audioUrl,
    audioKey,
  });
  
  // Option 2: Store for later use in a form
  setAudioData({ url: audioUrl, key: audioKey });
};
*/
