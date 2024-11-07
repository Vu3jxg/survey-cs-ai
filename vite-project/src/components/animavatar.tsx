import { useEffect, useRef } from 'react';
import { videoMaps } from '../types/videos'; 

export interface AnimProps {
  willReadScreen: boolean;
  lang: string | undefined;
  currentQuestionIndex: number;
  schoolLevel: 'elementary' | 'middle' | 'high'; 
}

export default function AnimAvatar({ willReadScreen, lang, currentQuestionIndex, schoolLevel }: AnimProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Determine the video map based on the language and school level
  let videoMap: Record<number, string> = {};

  if (schoolLevel === 'elementary') {
    if (lang === 'English') {
      videoMap = videoMaps.ElementaryEngVideoMap;
    } else if (lang === 'Hindi') {
      videoMap = videoMaps.ElementaryHinVideoMap;
    } else {
      videoMap = videoMaps.ElementaryKanVideoMap; // Fallback to Kannada
    }
  } else if (schoolLevel === 'middle') {
    if (lang === 'English') {
      videoMap = videoMaps.MiddleEngVideoMap;
    } else if (lang === 'Hindi') {
      videoMap = videoMaps.MiddleHinVideoMap;
    } else {
      videoMap = videoMaps.MiddleKanVideoMap; // Fallback to Kannada
    }
  } else if (schoolLevel === 'high') {
    if (lang === 'English') {
      videoMap = videoMaps.HighEngVideoMap;
    } else if (lang === 'Hindi') {
      videoMap = videoMaps.HighHinVideoMap;
    } else {
      videoMap = videoMaps.HighKanVideoMap; // Fallback to Kannada
    }
  }

  const videoSrc = videoMap[currentQuestionIndex + 1]; // Fetching the correct video based on the question index
  
  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.muted = !willReadScreen;
      videoElement.src = videoSrc;
      videoElement.load();
      videoElement.play()
        .catch((error) => console.error('Error attempting to play video:', error));
    }
  }, [videoSrc, willReadScreen]); // Effect runs when videoSrc or willReadScreen changes

  return (
    <div>
      <video ref={videoRef} width='480' height='480' autoPlay controls onError={(e) => console.error('Error loading video:', e)}>
        <source src={videoSrc} type="video/mp4,image/png" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
