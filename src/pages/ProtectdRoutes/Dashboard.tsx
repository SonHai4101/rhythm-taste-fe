import { useState } from "react";
import { Uploader } from "../../components/Uploader";
import { Button } from "@/components/ui/button";
import {
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Music, Search, Clock, PlayIcon, Ellipsis } from "lucide-react";
import { LiaPowerOffSolid } from "react-icons/lia";
import useAuthStore from "@/store/useAuthStore";
import { useNavigate } from "react-router";
import { useDeleteSongById, useGetAllSongs } from "@/hook/useSong";
import { Card, DropdownMenu, Flex, Table } from "@radix-ui/themes";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { formatDuration } from "@/helper/formatDuration";
import { usePlayerStore } from "@/store/usePlayerStore";
import { toast } from "react-toastify";
import { useDeleteAudio } from "@/hook/useAudio";
dayjs.extend(relativeTime);

export const Dashboard = () => {
  // const [songs, setSongs] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { data: allSongs, isLoading: songsLoading } = useGetAllSongs();
  const { mutate: deleteSong } = useDeleteSongById();
  const { mutate: deleteAudio } = useDeleteAudio();

  // const togglePlay = (song: Song) => {
  //   const { currentSong, isPlaying, setSong, setPlaying, audioElement } =
  //     usePlayerStore.getState();

  //   if (!audioElement) return;

  //   // If clicking the same song → toggle play/pause
  //   if (currentSong?.id === song.id) {
  //     setPlaying(!isPlaying);
  //     return;
  //   }

  //   // If clicking a new song → load & play it
  //   setSong(song); // sets current song
  //   setPlaying(true);
  // };

  const { logOut } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

  // Fetch all songs on mount

  // const handleSearch = async () => {
  //   if (!searchQuery.trim()) {
  //     // fetchSongs();
  //     return;
  //   }
  //   try {
  //     setLoading(true);
  //     const data = await songService.searchSongs(searchQuery);
  //     setSongs(data);
  //   } catch (error) {
  //     console.error("Failed to search songs:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleDeleteSong = async (id: string) => {
  //   if (!confirm("Are you sure you want to delete this song?")) return;
  //   try {
  //     await songService.deleteSong(id);
  //     // fetchSongs();
  //   } catch (error) {
  //     console.error("Failed to delete song:", error);
  //   }
  // };

  const handleDelete = (songId: string, audioId: string) => {
    deleteSong(songId, {
      onSuccess: () => {
        toast.success("Delete successfully");
        deleteAudio(audioId)
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  // const openEditDialog = (song: Song) => {
  //   setSelectedSong(song);
  //   // setFormData({
  //   //   title: song.title,
  //   //   artist: song.artist || "",
  //   //   album: song.album || "",
  //   //   duration: song.duration || 0,
  //   //   audioUrl: song.audio?.url || "",
  //   // });
  //   setIsEditDialogOpen(true);
  // };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-amber-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      {/* Header */}
      <div className="border-b bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
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
                // onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10"
              />
            </div>
            <Button
            // onClick={handleSearch}
            >
              Search
            </Button>
            {searchQuery && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  // fetchSongs();
                }}
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Upload Section */}
        <Card className="mb-8 border-dashed border-2 bg-linear-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/10">
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

        {allSongs && allSongs.data.length === 0 ? (
          <div className="text-center py-20">
            <Music className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No songs found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? "Try a different search query"
                : "Get started by adding your first song"}
            </p>
            {!searchQuery && (
              <Uploader type="custom" />
            )}
          </div>
        ) : (
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Album</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Date added</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  <Clock />
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            {songsLoading ? (
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell colSpan={5}>
                    <div className="flex items-center justify-center py-20">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    </div>
                  </Table.RowHeaderCell>
                </Table.Row>
              </Table.Body>
            ) : (
              allSongs?.data.map((song, index) => (
                <Table.Body className="hover:bg-white/70" key={song.id}>
                  <Table.Row className="group" align="center">
                    <Table.RowHeaderCell
                      className="min-w-11"
                      onClick={() => {
                        usePlayerStore
                          .getState()
                          .setQueue(allSongs.data, index);
                      }}
                    >
                      <PlayIcon className="size-5 hidden group-hover:inline-block cursor-pointer" />
                      <span className="group-hover:hidden">{index + 1}</span>
                    </Table.RowHeaderCell>

                    <Table.Cell>
                      <Flex gap="2" align="center">
                        <img
                          className="size-8"
                          src={song.albumCover || "/default-cover-image.png"}
                          alt="album cover"
                        />
                        <Flex direction="column">
                          <p>{song.title}</p>
                          <p>{song.artist}</p>
                        </Flex>
                      </Flex>
                    </Table.Cell>
                    <Table.Cell>{song.album}</Table.Cell>
                    <Table.Cell>{dayjs(song.createdAt).fromNow()}</Table.Cell>
                    <Table.Cell>{formatDuration(song.duration)}</Table.Cell>
                    <Table.Cell>
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                          <Button variant="ghost" className="cursor-pointer">
                            <Ellipsis className="size-4" />
                          </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                          <DropdownMenu.Item
                            color="red"
                            onClick={() => handleDelete(song.id, song.audioId)}
                          >
                            Delete
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Root>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))
            )}
          </Table.Root>
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
                // value={formData.title}
                onChange={() => {}}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-artist">Artist</Label>
              <Input
                id="edit-artist"
                placeholder="Artist name"
                // value={formData.artist}
                onChange={() => {}}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-album">Album</Label>
              <Input
                id="edit-album"
                placeholder="Album name"
                // value={formData.album}
                onChange={() => {}}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-duration">Duration (seconds)</Label>
              <Input
                id="edit-duration"
                type="number"
                placeholder="Duration in seconds"
                // value={formData.duration}
                onChange={() => {}}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-audioUrl">Audio URL</Label>
              <Input
                id="edit-audioUrl"
                placeholder="https://..."
                // value={formData.audioUrl}
                onChange={() => {}}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                // resetForm();
                // setSelectedSong(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => {}}>Update Song</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
