import { onUnmounted, ref, watch, type Ref } from "vue";
import { usePlayerStore } from "../stores/playerStore";
import { useYoutubeStore } from "../stores/youtubeStore";
import * as alphaTab from "@coderline/alphatab";
import { PlayerMode } from "@coderline/alphatab";

export function useYoutubePlayer(playerElement: Ref<HTMLDivElement | null>) {
  const yt = useYoutubeStore();
  const player = usePlayerStore();
  const SYNC_INTERVAL_MS = 50;
  let syncInterval: number | null = null;
  const startTimeInSeconds = ref(0);
  const syncOffsetSeconds = ref(0);

  let ytPlayer: any = null;

  async function initYouTube(): Promise<void> {
    if (!yt.videoId) return;
    if (!playerElement.value) return;

    await loadYouTubeAPI();

    await new Promise<void>((resolve, reject) => {
      const api = player.api;
      ytPlayer = new window.YT.Player(playerElement.value!, {
        videoId: yt.videoId,
        playerVars: {
          start: startTimeInSeconds.value,
          autoplay: 0,
        },
        events: {
          onReady: () => {
            if (!api) return;
            api.settings.player.playerMode = PlayerMode.EnabledExternalMedia;
            api.updateSettings();
            const duration = api.endTime / 1000;
            console.log({
              ytDuration: ytPlayer.getDuration(),
              atDuration: duration,
              diff: ytPlayer.getDuration() - duration,
            });
            resolve();
          },
          onStateChange: (e: any) => {
            switch (e.data) {
              case window.YT.PlayerState.PLAYING:
                startSyncClock();
                api && api.play();
                break;

              case window.YT.PlayerState.PAUSED:
                stopSyncClock();
                api && api.pause();
                break;

              case window.YT.PlayerState.ENDED:
                stopSyncClock();
                api && api.stop();
                break;
            }
          },
          onPlaybackRateChange: (e: any) => {
            if (!api) return;
            api.playbackSpeed = e.data;
          },
          onError: (e: Error) => reject(e),
        },
      });
    });
    bindHandler();
  }

  function loadYouTubeAPI(): Promise<void> {
    return new Promise<void>((resolve) => {
      if (window.YT?.Player) {
        resolve();
        return;
      }

      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/player_api";
      document.body.appendChild(tag);

      window.onYouTubePlayerAPIReady = () => {
        resolve();
      };
    });
  }

  function bindHandler(): void {
    if (!player.api) return;
    if (!ytPlayer) return;
    const handler: alphaTab.synth.IExternalMediaHandler = {
      get backingTrackDuration() {
        return ytPlayer.getDuration() * 1000;
      },
      get playbackRate() {
        return ytPlayer.getPlaybackRate();
      },
      set playbackRate(value: number) {
        ytPlayer.setPlaybackRate(value);
      },
      get masterVolume() {
        return ytPlayer.getVolume() / 100;
      },
      set masterVolume(value: number) {
        ytPlayer.setVolume(value * 100);
      },
      seekTo: (time: number) => ytPlayer.seekTo(time / 1000),
      play: () => ytPlayer.playVideo(),
      pause: () => ytPlayer.pauseVideo(),
    };
    const output = player.api?.player?.output as
      | alphaTab.synth.IExternalMediaSynthOutput
      | undefined;
    if (!output) {
      console.log("Not found output");
      return;
    }
    output.handler = handler;
  }

  function startSyncClock(): void {
    if (syncInterval) return;

    const output = player.api?.player?.output as
      | alphaTab.synth.IExternalMediaSynthOutput
      | undefined;

    if (!output) {
      console.log("Not found output");
      return;
    }

    syncInterval = window.setInterval(() => {
      if (!ytPlayer || !player.api) return;
      const ytTimeMs =
        (ytPlayer.getCurrentTime() -
          startTimeInSeconds.value +
          syncOffsetSeconds.value) *
        1000;
      output.updatePosition(ytTimeMs);
    }, SYNC_INTERVAL_MS);
  }

  function stopSyncClock(): void {
    if (syncInterval) {
      clearInterval(syncInterval);
      syncInterval = null;
    }
  }

  function parseTimeOffset(value: string): number {
    const sign = value.startsWith("-") ? -1 : 1;
    const normalized = value.replace("-", "");

    if (/^\d+(\.\d+)?s?$/.test(normalized)) {
      return sign * parseFloat(normalized);
    }

    let totalSeconds = 0;

    const minutesMatch = normalized.match(/(\d+(\.\d+)?)m/);
    const secondsMatch = normalized.match(/(\d+(\.\d+)?)s/);

    if (minutesMatch) {
      totalSeconds += parseFloat(minutesMatch[1]) * 60;
    }

    if (secondsMatch) {
      totalSeconds += parseFloat(secondsMatch[1]);
    }

    return sign * totalSeconds;
  }

  function extractYoutubeTimestamp(url: string): number {
    const regExp = /[?&](t|start)=([0-9hms.]+)/;
    const match = url.match(regExp);

    if (!match) return 0;

    const timeStr = match[2];

    if (/^\d+(\.\d+)?s?$/.test(timeStr)) {
      return parseFloat(timeStr);
    }

    let totalSeconds = 0;
    const minutesMatch = timeStr.match(/(\d+(\.\d+)?)m/);
    const secondsMatch = timeStr.match(/(\d+(\.\d+)?)s/);

    if (minutesMatch) {
      totalSeconds += parseFloat(minutesMatch[1]) * 60;
    }

    if (secondsMatch) {
      totalSeconds += parseFloat(secondsMatch[1]);
    }

    return totalSeconds;
  }

  function extractOffset(url: string): number {
    const match = url.match(/[?&]offset=([^&]+)/);

    if (!match) return 0;

    return parseTimeOffset(decodeURIComponent(match[1]));
  }
  watch(
    () => yt.url,
    async (newUrl) => {
      if (!newUrl) return;

      const videoId = yt.videoId;
      if (!videoId) return;

      startTimeInSeconds.value = extractYoutubeTimestamp(newUrl);
      syncOffsetSeconds.value = extractOffset(newUrl);
      console.log({
        startTime: startTimeInSeconds.value,
        offset: syncOffsetSeconds.value,
      });
      if (ytPlayer) {
        console.log("Has Player");
        ytPlayer.stopVideo();
        ytPlayer.loadVideoById({
          videoId,
          startSeconds: startTimeInSeconds.value,
        });
        return;
      }
      console.log("No existing Player");
      await initYouTube();
    },
    {
      flush: "post",
    },
  );
  onUnmounted(() => {
    stopSyncClock();
  });

  return {
    startTimeInSeconds,
    syncOffsetSeconds,
    ytPlayer,
  };
}
