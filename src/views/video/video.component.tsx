import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/http-streaming";
import "videojs-youtube/dist/Youtube.min.js";
import './video.css';
import MeasureHeight from "@/components/ measure-height.component";


const VideoJS: React.FC = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>();

  const options: videojs.PlayerOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    techOrder: ["youtube"],
    sources: [
      {
        type: "video/youtube",
        src: "https://www.youtube.com/watch?v=BdHaeczStRA",
      },
    ],
  };

  useEffect(() => {
    if (videoRef.current) {
      console.log(videoRef.current.clientHeight);

    }

    if (!playerRef.current) {
      const videoElement = document.createElement("video");
      videoElement.classList.add("video-js", "vjs-big-play-centered");

      if (videoRef.current) {
        videoRef.current.appendChild(videoElement);
      }

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready");
      }));
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  useEffect(() => {
    return () => {
      const player = playerRef.current;
      if (player) {
        player.dispose();
        playerRef.current = undefined;
      }
    };
  }, []);

  return (
    <div className="video-component" data-vjs-player>
      <MeasureHeight>
        <div ref={videoRef} />
      </MeasureHeight>
    </div>
  );
};

export default VideoJS;
