import VideoPlayerControls from "@/components/features/video-player/video-player-controls";
import { Fragment, useEffect, useRef, useState } from "react";

export default function VideoPlayer({ src, poster }: { src: string, poster?: string }) {
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>();
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Start loading video when 50% visible
          if (entry.intersectionRatio > 0.5) {
            setShouldLoad(true);
          }
        }
      },
      { 
        threshold: [0.1, 0.5],
        rootMargin: '100px 0px' // Start loading 100px before element comes into view
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      setVideoDuration(video.duration);
      // Enforce iPhone-compatible settings
      video.muted = true;
      video.playsInline = true;
      if (isVisible) {
        video.play().catch(error => console.error('Video autoplay failed:', error));
      }
    }
  }, [isVisible]);

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
    <div 
      ref={containerRef}
      className="relative w-full rounded-xl overflow-hidden my-8"
      style={{ aspectRatio: '16/9' }} // 1920x1080 aspect ratio
    >
      {!shouldLoad ? (
        // Lazy loading placeholder
        <div 
          className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center"
          style={{ aspectRatio: '16/9' }}
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <p className="text-gray-600 text-sm">Loading video...</p>
            <p className="text-gray-500 text-xs mt-1">Hill Crest Residency Electrical Installation</p>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className="absolute top-4 right-4 z-10">
            <VideoPlayerControls
              progress={videoProgress}
              isPaused={isPaused}
              onPlayPause={togglePlayPause}
            />
          </div>
          <video 
            className="w-full h-full object-cover bg-neutral-300" 
            poster={poster} 
            ref={videoRef} 
            preload="metadata"
            loop 
            autoPlay={isVisible} 
            playsInline 
            muted 
            controls={false} 
            disablePictureInPicture
            {...({ 'webkit-playsinline': 'true' } as any)}
            {...({ 'x5-playsinline': 'true' } as any)}
            {...({ 'x5-video-player-type': 'h5' } as any)}
            style={{ aspectRatio: '16/9' }}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Fragment>
      )}
      
      {/* Responsive overlay for mobile */}
      <div className="absolute inset-0 lg:hidden">
        <div className="w-full h-full flex items-center justify-center">
          {!shouldLoad && (
            <button
              onClick={() => setShouldLoad(true)}
              className="bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Load Video (26MB)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}