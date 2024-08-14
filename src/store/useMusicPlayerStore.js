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
  volume: 0.3,
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
    const { audioRef, volume } = get();

    // previewUrl null인 경우 알림창을 띄우고 함수 종료
    if (!track.previewUrl) {
      alert('미리듣기를 지원하지 않는 트랙입니다.');
      return;
    }

    // 클린업 함수
    const cleanup = () => {
      audioRef.pause();
      audioRef.src = '';
      audioRef.ontimeupdate = null;
      audioRef.removeEventListener('loadedmetadata', onDurationChange);
      audioRef.removeEventListener('ended', onEnded);
      clearInterval(intervalId);
    };

    // 상태 설정
    set({
      currentTrack: {
        name: track.name,
        artist: track.artist,
        thumbnailUrl: track.thumbnailUrl,
        previewUrl: track.previewUrl,
        duration: track.duration,
      },
      isVisible: true,
      currentTime: 0,
    });

    // 오디오 소스 설정 및 로드
    audioRef.src = track.previewUrl;
    audioRef.load();

    // 초기 볼륨 설정
    audioRef.volume = volume;

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

    // 재생 종료시 처리
    const onEnded = () => {
      set({ isPlaying: false, currentTime: 0 });
      audioRef.currentTime = 0;
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

    audioRef.addEventListener('ended', onEnded);

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
      const scaledValue = newValue * 0.6;
      const clampedValue = Math.min(Math.max(scaledValue, 0), 0.6);
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

  getDisplayVolume: () => {
    const { volume } = get();
    // 실제 볼륨(0~0.6)을 표시용 볼륨(0~1)으로 변환
    return volume / 0.6;
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
      set({ isVisible: true });
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
