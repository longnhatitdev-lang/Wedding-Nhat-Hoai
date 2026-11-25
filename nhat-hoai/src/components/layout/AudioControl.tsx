"use client";

import { useEffect, useRef, useState } from "react";

export function AudioControl() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const play = () => {
      if (audio.paused && !manuallyPaused.current) {
        void audio.play().catch(() => { /* The browser may require another interaction. */ });
      }
    };
    const unlock = (event: Event) => {
      if (event.target instanceof Node && buttonRef.current?.contains(event.target)) return;
      play();
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onVisibility = () => document.hidden ? audio.pause() : play();
    const onFocus = () => { if (!document.hidden) play(); };
    const onBlur = () => audio.pause();

    document.addEventListener("pointerdown", unlock, true);
    document.addEventListener("keydown", unlock, true);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    window.addEventListener("pagehide", onBlur);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      document.removeEventListener("pointerdown", unlock, true);
      document.removeEventListener("keydown", unlock, true);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("pagehide", onBlur);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      manuallyPaused.current = false;
      void audio.play().catch(() => { /* Keep the control in its paused state. */ });
    } else {
      manuallyPaused.current = true;
      audio.pause();
    }
  }

  return <>
    <audio ref={audioRef} id="my_audio" loop preload="none" src="/asset/audio/le-duong.mp3" />
    <button ref={buttonRef} id="audio_play" type="button" className={playing ? "playing" : ""} aria-label={playing ? "Tắt nhạc nền" : "Bật nhạc nền"} aria-pressed={playing} onClick={toggleAudio}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img id="audio_icon" src="/asset/icon/audio.png" alt="" />
    </button>
  </>;
}
