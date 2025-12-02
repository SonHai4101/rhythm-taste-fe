import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import { Theme } from "@radix-ui/themes";
import { useEffect, useRef } from "react";
import { usePlayerStore } from "./store/usePlayerStore";

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const setAudioElement = usePlayerStore((s) => s.setAudioElement);
  const currentSong = usePlayerStore((s) => s.currentSong);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const setCurrentTime = usePlayerStore((s) => s.setCurrentTime);
  const setDuration = usePlayerStore((s) => s.setDuration);

  useEffect(() => {
    const store = usePlayerStore.getState();
    store.loadStateFromLocalStorage();

    if (store.currentSong && store.audioElement) {
      store.audioElement.src = store.currentSong.audio.url;

      store.audioElement.currentTime = store.currentTime || 0;
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setAudioElement(audio);

    audio.onended = () => {
      usePlayerStore.getState().next();
    };
    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };
    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.audio.url;
      audioRef.current.play();
    }
  }, [currentSong]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying]);

  return (
    <div>
      <Theme>
        <Outlet />
        <ToastContainer position="top-right" autoClose={3000} />
        <audio ref={audioRef} />
      </Theme>
    </div>
  );
}

export default App;
