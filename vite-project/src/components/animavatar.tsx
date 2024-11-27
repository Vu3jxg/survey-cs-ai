import { useEffect, MutableRefObject } from 'react';
import { videoMaps } from '../types/videos';

export interface AnimProps {
  willReadScreen: boolean;
  lang: string | undefined;
  currentQuestionIndex: number;
  schoolLevel: 'elementary' | 'middle' | 'high';
  videoRef: MutableRefObject<HTMLVideoElement | null>; // Accepting videoRef as a prop
}

export default function AnimAvatar({ willReadScreen, lang, currentQuestionIndex, schoolLevel, videoRef }: AnimProps) {
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
      videoElement.playbackRate = 0.75; // Set the desired playback rate to 0.75
      videoElement.muted = !willReadScreen; // Mute or unmute based on willReadScreen
      videoElement.src = videoSrc; // Assign the video source
      videoElement.load();

      videoElement
        .play()
        .then(() => {
          // Ensure playback rate is maintained even after play starts
          videoElement.playbackRate = 0.75;
        })
        .catch((error) => console.error('Error attempting to play video:', error));
    }
  }, [videoSrc, willReadScreen, videoRef]);

  return (
    <div>
      {videoSrc.endsWith('.mp4') ? (
        <video
          ref={videoRef}
          width="480"
          height="480"
          autoPlay
          controls
          onError={(e) => console.error('Error loading video:', e)}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={videoSrc}
          alt="Image content"
          width="480"
          height="480"
          onError={(e) => console.error('Error loading image:', e)}
        />
      )}
    </div>
  );
}
