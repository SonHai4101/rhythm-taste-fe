import type { Song } from "@/constants/types";
import { shuffleArray } from "@/util/shuffle";
import { create } from "zustand";

interface PlayerStore {
  queue: Song[];
  originalQueue: Song[];
  queueIndex: number;

  currentTime: number;
  duration: number;

  currentSong: Song | null;
  isPlaying: boolean;
  isShuffling: boolean;
  audioElement: HTMLAudioElement | null;

  volume: number;
  muted: boolean;

  repeatMode: "off" | "all" | "one";
  toggleRepeat: () => void;

  setAudioElement: (el: HTMLAudioElement) => void;
  setSong: (song: Song) => void;
  setPlaying: (is: boolean) => void;
  togglePlay: () => void;
  toggleShuffel: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (time: number) => void;
  setQueue: (song: Song[], startIndex: number) => void;
  next: () => void;
  previous: () => void;

  saveStateToLocalStorage: () => void;
  loadStateFromLocalStorage: () => void;

  setVolume: (value: number) => void;
  toggleMute: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  queue: [],
  originalQueue: [],
  queueIndex: 0,
  currentTime: 0,
  duration: 0,
  currentSong: null,
  isPlaying: false,
  isShuffling: false,
  audioElement: null,
  volume: 80,
  muted: false,
  repeatMode: "off",
  toggleRepeat: () =>
    set((state) => {
      const nextMode =
        state.repeatMode === "off"
          ? "all"
          : state.repeatMode === "all"
          ? "one"
          : "off";

      return { repeatMode: nextMode };
    }),
  setAudioElement: (el) => set({ audioElement: el }),
  setSong: (song) =>
    set({
      currentSong: song,
      isPlaying: true,
      currentTime: 0,
    }),
  setPlaying: (is) => set({ isPlaying: is }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  toggleShuffel: () =>
    set((state) => {
      const isShuffling = !state.isShuffling;

      if (isShuffling) {
        const shuffled = [...state.queue];
        shuffleArray(shuffled);

        const current = state.currentSong;

        if (current) {
          const index = shuffled.findIndex((s) => s.id === current.id);

          if (index !== -1) {
            shuffled.splice(index, 1);
            shuffled.unshift(current);
          }
        }
        return {
          isShuffling: true,
          queue: shuffled,
          queueIndex: 0,
        };
      }
      const original = state.originalQueue;
      const index = original.findIndex((s) => s.id === state.currentSong?.id);
      return {
        isShuffling: false,
        queue: original,
        queueIndex: index === -1 ? 0 : index,
      };
    }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (time) => set({ duration: time }),
  setQueue: (songs, startIndex) =>
    set({
      queue: songs,
      originalQueue: songs,
      queueIndex: startIndex,
      currentSong: songs[startIndex],
      isPlaying: true,
      currentTime: 0,
    }),
  next: () => {
    const { queue, queueIndex, repeatMode } = get();
    if (repeatMode === "one") {
      // simply restart the same song
      const audio = get().audioElement;
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
      set({ currentTime: 0, isPlaying: true });
      return;
    }
    const nextIndex = queueIndex + 1;

    if (nextIndex >= queue.length) {
      if (repeatMode === "all") {
        // loop back to start
        set({
          queueIndex: 0,
          currentSong: queue[0],
          isPlaying: true,
          currentTime: 0,
        });
      }
      return;
    }

    set({
      queueIndex: nextIndex,
      currentSong: queue[nextIndex],
      isPlaying: true,
      currentTime: 0,
    });
  },
  previous: () => {
    const { queue, queueIndex } = get();
    const prevIndex = queueIndex - 1;
    if (prevIndex < 0) return;

    set({
      queueIndex: prevIndex,
      currentSong: queue[prevIndex],
      isPlaying: true,
      currentTime: 0,
    });
  },
  saveStateToLocalStorage: () => {
    const state = get();

    const data = {
      currentSong: state.currentSong,
      queue: state.queue,
      queueIndex: state.queueIndex,
      currentTime: state.currentTime,
      repeatMode: state.repeatMode,
      isShuffling: state.isShuffling,
    };
    localStorage.setItem("playerState", JSON.stringify(data));
  },
  loadStateFromLocalStorage: () => {
    try {
      const raw = localStorage.getItem("playerState");
      if (!raw) return;
      const data = JSON.parse(raw);

      set({
        currentSong: data.currentSong,
        queue: data.queue,
        queueIndex: data.queueIndex,
        currentTime: data.currentTime,
        repeatMode: data.repeatMode,
        isShuffling: data.isShuffling,
      });
    } catch (err) {
      console.error("Failed to load player state: ", err);
    }
  },
  setVolume: (value) => {
    const audio = get().audioElement;
    if (audio) audio.volume = value / 100;
    set({
      volume: value,
      muted: value === 0,
    });
  },
  toggleMute: () => {
    const state = get();
    const newMute = !state.muted;

    if (state.audioElement) {
      if (newMute) {
        // Muting: set audio to 0
        state.audioElement.volume = 0;
      } else {
        // Unmuting: restore to the stored volume (or default to 80 if it was 0)
        const restoreVolume = state.volume > 0 ? state.volume : 80;
        state.audioElement.volume = restoreVolume / 100;
        // Update the volume state if it was 0
        if (state.volume === 0) {
          set({ muted: false, volume: restoreVolume });
          return;
        }
      }
    }
    set({ muted: newMute });
  },
}));

usePlayerStore.subscribe((state) => {
  // Save to localStorage whenever relevant state changes
  state.saveStateToLocalStorage();
});
