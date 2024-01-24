import React, { useRef, useState } from 'react';
import { PlayIcon } from '@heroicons/react/24/outline'; // Import PlayIcon from Heroicons
import 'tailwindcss/tailwind.css';


const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setPlaying(true);
      } else {
        videoRef.current.pause();
        setPlaying(false);
      }
    }
  };

  // Placeholder video source
  const videoSrc = 'https://www.w3schools.com/html/mov_bbb.mp4';

  return (
    <div className="lg:w-3/5 bg-color w-full mx-auto lg:rounded-xl lg:shadow-custom relative mt-24 mb-24 lg:my-28">
      <image src=""></image>
      <video
        ref={videoRef}
        className="w-full cursor-pointer mx-auto lg:rounded-md"
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        preload="none"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {!playing && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          onClick={togglePlay}
        >
          <PlayIcon className="h-12 w-12 text-white" />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
