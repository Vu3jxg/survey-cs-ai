import { useEffect, useRef } from 'react';
import { videoMaps } from '../types/videos'; 

export interface AnimProps {
  willReadScreen: boolean;
  lang: string | undefined;
  currentQuestionIndex: number;
}

export default function AnimAvatar({ willReadScreen, lang, currentQuestionIndex }: AnimProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Determine the video map based on the language
  let videoMap: Record<number, string>;

  if (lang === 'English') {
    videoMap = videoMaps.ElementaryEngVideoMap;
  } else if (lang === 'Hindi') {
    videoMap = videoMaps.ElementaryHinVideoMap;
  } else {
    videoMap = videoMaps.ElementaryKanVideoMap; // Fallback to English
  }

  const videoSrc = videoMap[currentQuestionIndex + 1];
  
  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.muted = !willReadScreen;
      videoElement.src = videoSrc;
      videoElement.load();
      videoElement.play()
        .catch((error) => console.error('Error attempting to play video:', error));
    }
  }, [videoSrc, willReadScreen]); // Run effect when videoSrc or willReadScreen changes

  return (
    <div>
      <video ref={videoRef} width='350' height='350' autoPlay onError={(e) => console.error('Error loading video:', e)}>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
