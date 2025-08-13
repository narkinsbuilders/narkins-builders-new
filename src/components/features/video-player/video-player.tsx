import VideoPlayerControls from "@/components/features/video-player/video-player-controls";
import { Fragment, useEffect, useRef, useState } from "react";

export default function VideoPlayer({ src, poster }: { src: string, poster?: string }) {
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>();
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      setVideoDuration(video.duration);
    }
    function isMobileSafari() {
  return navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/) || ('safari' in window)
}
    setIsSafari(!!isMobileSafari());
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const currentTime = videoRef.current?.currentTime;
    if (videoDuration != null && currentTime != null) {
      let loadingTimeout = setTimeout(() => {
        if (videoProgress == currentTime / videoDuration) {
          setVideoProgress((prev) => prev + 0.000001);
        } else {
          setVideoProgress(currentTime / videoDuration);
        }
      }, 10);

      return () => {
        clearTimeout(loadingTimeout);
      };
    }
  }, [videoProgress, videoDuration, isPaused]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      setIsPaused(!video.paused);
      video.paused ? video.play() : video.pause();
    }
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden">
      {isSafari ? <video autoPlay className="w-full bg-neutral-300" muted poster={poster} playsInline controls>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video> : (
        <Fragment>
          <div className="absolute top-4 right-4 z-10">
            <VideoPlayerControls
              progress={videoProgress}
              isPaused={isPaused}
              onPlayPause={togglePlayPause}
            />
          </div>
          <video className="w-full h-auto bg-neutral-300" poster={poster} ref={videoRef} preload="yes"
            loop autoPlay playsInline muted controls={false} disablePictureInPicture>
            <source src={src} type="video/mp4" />
          </video>
        </Fragment>
      )}
    </div>
  );
}