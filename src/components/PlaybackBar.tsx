import { Button } from "./ui/button";
import {
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  VolumeIcon,
} from "lucide-react";
import { Slider } from "@radix-ui/themes";
import { usePlayerStore } from "@/store/usePlayerStore";
import { formatDuration } from "@/helper/formatDuration";

export const PlaybackBar = () => {
  const currentSong = usePlayerStore((s) => s.currentSong);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const togglePlay = usePlayerStore((s) => s.togglePlay);
  const currentTime = usePlayerStore((s) => s.currentTime);
  const duration = usePlayerStore((s) => s.duration);
  const audioElement = usePlayerStore((s) => s.audioElement);
  const previous = usePlayerStore((s) => s.previous);
  const next = usePlayerStore((s) => s.next);
  const isShuffling = usePlayerStore((s) => s.isShuffling);
  const toggleShuffle = usePlayerStore((s) => s.toggleShuffel);
  const repeatMode = usePlayerStore((s) => s.repeatMode);
  const toggleRepeat = usePlayerStore((s) => s.toggleRepeat);

  return (
    <div className="fixed bottom-0 w-full flex items-center justify-between gap-4 bg-card border border-border rounded-xl px-6 py-4 shadow-lg">
      {/* Track Info */}
      <div className="flex items-center gap-4 min-w-0 w-1/4">
        <div className="w-14 h-14 rounded-lg bg-muted items-center justify-center shrink-0 overflow-hidden hidden md:flex">
          <img
            src="/album-cover-art-music.jpg"
            alt="Album cover"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="font-medium text-foreground truncate">
            {currentSong?.title || "undefined"}
          </p>
          <p className="text-sm text-muted-foreground truncate">
            {currentSong?.artist || "undefined"}
          </p>
        </div>
      </div>

      {/* Main Controls */}
      <div className="flex flex-col items-center gap-2 flex-1 max-w-xl">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={`h-9 w-9 ${isShuffling ? "hover:text-red-500" : "hover:text-foreground"} ${
              isShuffling ? "text-red-500" : "text-muted-foreground"
            }`}
            onClick={toggleShuffle}
          >
            <Shuffle className="h-4 w-4" />
            <span className="sr-only">Shuffle</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground"
            onClick={previous}
          >
            <SkipBack className="h-5 w-5" />
            <span className="sr-only">Previous</span>
          </Button>

          <Button
            variant="default"
            size="icon"
            className="h-12{ w-12 rounded-full"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
            <span className="sr-only">
              {/* {isPlaying ? "Pause" : "Play"} */}
              play
            </span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground"
            onClick={next}
          >
            <SkipForward className="h-5 w-5" />
            <span className="sr-only">Next</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={
              `h-9 w-9 text-muted-foreground ${repeatMode !== "off" ? "hover:text-yellow-500" : "hover:text-muted-foreground"} relative ${repeatMode !== "off" ? "text-yellow-500" : "text-muted-foreground"}`
            }
            onClick={toggleRepeat}
          >
            <Repeat className="h-4 w-4" />
            {repeatMode === "one" && (
              <span className="absolute top-0.5 right-0.5 text-[10px] font-bold text-primary">1</span>
            )}
            <span className="sr-only">Repeat</span>
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 w-full">
          <span className="text-xs text-muted-foreground w-10 text-right tabular-nums">
            {formatDuration(currentTime)}
          </span>
          <Slider
            value={[currentTime]}
            max={duration || 0}
            step={1}
            onValueChange={(value) => {
              if (audioElement) audioElement.currentTime = value[0];
            }}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground w-10 tabular-nums">
            {formatDuration(duration)}
          </span>
        </div>
      </div>

      {/* Volume & Extra Controls */}
      <div className="flex items-center w-1/5 justify-end">
        {/* <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-muted-foreground hover:text-foreground"
        >
          <List className="h-4 w-4" />
          <span className="sr-only">Queue</span>
        </Button> */}

        <div className="flex items-center ">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground"
            // onClick={handleVolumeToggle}
          >
            <VolumeIcon className="h-4 w-4" />
            <span className="sr-only">
              {/* {isMuted ? "Unmute" : "Mute"} */}
              Mute
            </span>
          </Button>
          <Slider
            // value={[currentTime]}
            // max={duration || 0}
            step={1}
            // onValueChange={(value) => {
            //   setVolume(value[0])
            //   setIsMuted(value[0] === 0)
            // }}
            className="w-24"
          />
        </div>

        {/* <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-muted-foreground hover:text-foreground"
        >
          <Maximize2 className="h-4 w-4" />
          <span className="sr-only">Fullscreen</span>
        </Button> */}
      </div>
    </div>
  );
};
