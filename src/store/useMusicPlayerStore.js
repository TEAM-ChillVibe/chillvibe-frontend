import create from 'zustand';

const useAudio = () => {
  const audioRef = new Audio();
  return audioRef;
};

const useMusicPlayerStore = create((set, get) => ({
  isPlaying: false,
  isVisible: false,
  currentTrack: null,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  audioRef: useAudio(),

  setIsPlaying: isPlaying => set({ isPlaying }),
  setIsVisible: isVisible => set({ isVisible }),
  setCurrentTrack: currentTrack => set({ currentTrack }),
  setCurrentTime: currentTime => set({ currentTime }),
  setDuration: duration => set({ duration }),
  setVolume: volume => set({ volume }),
  setIsMuted: isMuted => set({ isMuted }),

  playTrack: track => {
    const { audioRef } = get();

    // 클린업 함수
    const cleanup = () => {
      audioRef.pause();
      audioRef.src = '';
      audioRef.ontimeupdate = null;
      audioRef.removeEventListener('loadedmetadata', onDurationChange);
      clearInterval(intervalId);
    };

    // 상태 설정
    set({
      currentTrack: {
        title: track.title,
        artist: track.artist,
        albumCover: track.albumCover,
        audioSrc: track.audioSrc,
        duration: track.duration,
      },
      isVisible: true,
      currentTime: 0,
    });

    // 오디오 소스 설정 및 로드
    audioRef.src = track.audioSrc;
    audioRef.load();

    // 현재 시간 업데이트 메서드
    const updateCurrentTime = () => {
      set({ currentTime: audioRef.currentTime });
    };

    // 타이머 설정 (현재 시간 업데이트)
    const intervalId = setInterval(updateCurrentTime, 1000);

    // 메타데이터 로드 후 지속시간 설정
    const onDurationChange = duration => {
      set({ duration });
    };

    audioRef.ontimeupdate = () => {
      set({ currentTime: audioRef.currentTime });
    };

    // 오디오 재생 시도
    audioRef
      .play()
      .then(() => set({ isPlaying: true }))
      .catch(error => {
        set({ isPlaying: false });
      });

    audioRef.addEventListener('loadedmetadata', () => {
      onDurationChange(audioRef.duration);
    });

    // return () => {
    //   clearInterval(intervalId);
    //   audioRef.ontimeupdate = null;
    //   audioRef.removeEventListener('loadedmetadata', () => {
    //     onDurationChange(audioRef.duration);
    //   });
    // };
    return cleanup;
  },

  seekTo: time => {
    const { audioRef } = get();
    audioRef.currentTime = time;
    set({ currentTime: time });
  },

  handleProgressChange: newValue => {
    get().seekTo(newValue);
  },

  handleVolumeChange: newValue => {
    const { audioRef } = get();
    if (typeof newValue === 'number' && isFinite(newValue)) {
      const clampedValue = Math.min(Math.max(newValue, 0), 1);
      set({ volume: clampedValue, isMuted: clampedValue === 0 });
      if (audioRef) {
        audioRef.volume = clampedValue;
      }
    } else {
      set({ volume: 0, isMuted: true });
      if (audioRef) {
        audioRef.volume = 0;
      }
    }
  },

  handleVolumeToggle: () => {
    const { audioRef, isMuted } = get();
    const newMutedState = !isMuted;
    set({ isMuted: newMutedState });
    audioRef.muted = newMutedState;
  },

  togglePlay: () => {
    const { audioRef, isPlaying } = get();
    if (isPlaying) {
      audioRef.pause();
    } else {
      if (audioRef.ended) {
        audioRef.currentTime = 0;
      }
      audioRef.play().catch(error => {
        set({ isPlaying: false });
      });
    }
    set({ isPlaying: !isPlaying });
  },

  stopPlayback: () => {
    const { audioRef } = get();
    audioRef.pause();
    set({ isPlaying: false, isVisible: false });
  },
}));

export default useMusicPlayerStore;
