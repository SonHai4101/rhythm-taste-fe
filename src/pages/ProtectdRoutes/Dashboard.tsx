import React, { useState, useEffect } from "react";
import { Uploader } from "../../components/Uploader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { songService } from "@/services/songService";
import type { Song, CreateSongInput } from "@/services/songService";
import { Music, Trash2, Edit, Plus, Search, Play, Pause } from "lucide-react";
import { LiaPowerOffSolid } from "react-icons/lia";
import useAuthStore from "@/store/useAuthStore";
import { useNavigate } from "react-router";

export const Dashboard = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateSongInput>({
    title: "",
    artist: "",
    album: "",
    duration: 0,
    audioUrl: "",
  });
  const { logOut } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

  // Fetch all songs on mount
  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const data = await songService.getAllSongs();
      setSongs(data);
    } catch (error) {
      console.error("Failed to fetch songs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchSongs();
      return;
    }
    try {
      setLoading(true);
      const data = await songService.searchSongs(searchQuery);
      setSongs(data);
    } catch (error) {
      console.error("Failed to search songs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSong = async () => {
    try {
      await songService.createSong(formData);
      setIsCreateDialogOpen(false);
      resetForm();
      fetchSongs();
    } catch (error) {
      console.error("Failed to create song:", error);
    }
  };

  const handleUpdateSong = async () => {
    if (!selectedSong) return;
    try {
      await songService.updateSong(selectedSong.id, formData);
      setIsEditDialogOpen(false);
      resetForm();
      setSelectedSong(null);
      fetchSongs();
    } catch (error) {
      console.error("Failed to update song:", error);
    }
  };

  const handleDeleteSong = async (id: string) => {
    if (!confirm("Are you sure you want to delete this song?")) return;
    try {
      await songService.deleteSong(id);
      fetchSongs();
    } catch (error) {
      console.error("Failed to delete song:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      artist: "",
      album: "",
      duration: 0,
      audioUrl: "",
    });
  };

  const openEditDialog = (song: Song) => {
    setSelectedSong(song);
    setFormData({
      title: song.title,
      artist: song.artist || "",
      album: song.album || "",
      duration: song.duration || 0,
      audioUrl: song.audio?.url || "",
    });
    setIsEditDialogOpen(true);
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "N/A";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePlay = (songId: string) => {
    setCurrentlyPlaying(currentlyPlaying === songId ? null : songId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      {/* Header */}
      <div className="border-b bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                My Music Library
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your uploaded songs
              </p>
            </div>
            <Button onClick={handleLogout} className="gap-2" size="lg">
              <LiaPowerOffSolid className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex gap-2 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search songs by title, artist, or album..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
            {searchQuery && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  fetchSongs();
                }}
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Upload Section */}
        <Card className="mb-8 border-dashed border-2 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="h-5 w-5" />
              Upload Audio File
            </CardTitle>
            <CardDescription>
              Upload an audio file to create a new song entry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Uploader />
          </CardContent>
        </Card>

        {/* Songs Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : songs.length === 0 ? (
          <div className="text-center py-20">
            <Music className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No songs found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? "Try a different search query"
                : "Get started by adding your first song"}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Song
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {songs.map((song) => (
              <Card
                key={song.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-800 dark:to-purple-900/20 border-purple-200/50 dark:border-purple-700/50"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="truncate text-lg">
                        {song.title}
                      </CardTitle>
                      <CardDescription className="truncate">
                        {song.artist || "Unknown Artist"}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => togglePlay(song.id)}
                      className="shrink-0"
                    >
                      {currentlyPlaying === song.id ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {song.album && (
                      <p className="text-sm text-muted-foreground truncate">
                        <span className="font-medium">Album:</span> {song.album}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Duration:</span>{" "}
                      {formatDuration(song.duration)}
                    </p>
                    {song.audio?.url && (
                      <div className="mt-3">
                        <audio
                          src={song.audio.url}
                          controls
                          className="w-full h-8"
                          onPlay={() => setCurrentlyPlaying(song.id)}
                          onPause={() => setCurrentlyPlaying(null)}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => openEditDialog(song)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleDeleteSong(song.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Song</DialogTitle>
            <DialogDescription>
              Update the song information below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                placeholder="Song title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-artist">Artist</Label>
              <Input
                id="edit-artist"
                placeholder="Artist name"
                value={formData.artist}
                onChange={(e) =>
                  setFormData({ ...formData, artist: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-album">Album</Label>
              <Input
                id="edit-album"
                placeholder="Album name"
                value={formData.album}
                onChange={(e) =>
                  setFormData({ ...formData, album: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-duration">Duration (seconds)</Label>
              <Input
                id="edit-duration"
                type="number"
                placeholder="Duration in seconds"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-audioUrl">Audio URL</Label>
              <Input
                id="edit-audioUrl"
                placeholder="https://..."
                value={formData.audioUrl}
                onChange={(e) =>
                  setFormData({ ...formData, audioUrl: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                resetForm();
                setSelectedSong(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateSong}>Update Song</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
