import { useEffect, useRef } from 'react';
import { videoMaps } from '../types/videos';

export interface AnimProps {
  willReadScreen: boolean;
  lang: string| undefined;
  currentQuestionIndex: number;
}

export default function AnimAvatar({ willReadScreen, lang, currentQuestionIndex }: AnimProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !willReadScreen;
    }
  }, [willReadScreen]);

  let videoMap: Record<number, string>;

  if (lang === 'English') {
    videoMap = videoMaps.ElementaryEngVideoMap;
  } else if (lang === 'Hindi') {
    videoMap = videoMaps.ElementaryHinVideoMap;
  } else {
    videoMap = videoMaps.ElementaryKanVideoMap;
  }

  const videoSrc = videoMap[currentQuestionIndex] ? `/${videoMap[currentQuestionIndex]}` : '';

  return (
    <div>
      <video ref={videoRef} width='250' height='250' autoPlay loop muted>
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    </div>
  );
}