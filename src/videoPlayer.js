import React, { useState, useRef } from "react";

import playImage from './play-button.png';
import pauseImage from './pause.png';
import forward from  './forward.png';
import backword from './back-arrow.png';

import './App.css';

function VideoPlayer() {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekTime, setSeekTime] = useState(0);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current.play();
  };

  const handlePause = () => {
    setIsPlaying(false);
    videoRef.current.pause();
  };

  const handleSeek = (event) => {
    const time = event.target.value;
    setSeekTime(time);
    setIsSeeking(true);
  };

  const handleSeekEnd = (event) => {
    const time = event.target.value;
    videoRef.current.currentTime = time;
    setSeekTime(0);
    setIsSeeking(false);
  };

  const handleSpeedChange = (event) => {
    const speed = parseFloat(event.target.value);
    setPlaybackRate(speed);
    videoRef.current.playbackRate = speed;
  };

  const handleTimeUpdate = () => {
    if (!isSeeking) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const handleSkip = (time) => {
    videoRef.current.currentTime += time;
    setCurrentTime(videoRef.current.currentTime);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  

  return (
    <div>
        <div className="Header"><h1><u>Frontend Intern Assignment</u></h1></div>
    <div className="mainContainer">
     <div>        
      <video className="videoContainer" 
        ref={videoRef}
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4
        "
        onTimeUpdate={handleTimeUpdate}
      />
      <div className="controls">
    <div className="videoRangeContainer">
      <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={isSeeking ? seekTime : currentTime}
          onChange={handleSeek}
          onMouseUp={handleSeekEnd}
          onTouchEnd={handleSeekEnd}
        />
        <span>{formatTime(duration)}</span>
       </div>
       <div className="ppbuttons">
       <button onClick={() => handleSkip(-5)}>
        <img src={backword} alt="Backword" />
        </button>

       
        <button onClick={isPlaying ? handlePause : handlePlay}>
        <img src={isPlaying ? pauseImage : playImage} alt={isPlaying ? "Pause" : "Play"} />
        </button>
            <button onClick={() => handleSkip(5)}>
             <img src={forward} alt="Forward" />
            </button>

       <span className="spanner">
        <span className="cTime">{formatTime(currentTime)}</span>
        
        <select value={playbackRate} onChange={handleSpeedChange}>
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
        </span>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default VideoPlayer;
// You can customize the appearance of the video player by adding CSS styles to the controls div and the video element. Additionally, you can add more features such as a volume control, fullscreen mode, or subtitles by adding more elements and handlers to the component.





