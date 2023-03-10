import React, { useRef, useEffect, useCallback } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/http-streaming";
import "videojs-youtube/dist/Youtube.min.js";
import './video.css';
import MeasureHeight from "@/components/ measure-height.component";
import { useDispatch, useStore } from "react-redux";
import { setCurrentSubtitle, setCurrentTime, setVideoHeight } from "@/store/app/action";
import { RootState } from "@/store";
import { convertTimeToSeconds } from "@/utils/time-helper";


const VideoJS: React.FC = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>();
  const store = useStore<RootState>()
  const dispatch = useDispatch()



  useEffect(() => {
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

    if (!playerRef.current) {
      const videoElement = document.createElement("video");
      videoElement.classList.add("video-js", "vjs-big-play-centered");

      if (videoRef.current) {
        videoRef.current.appendChild(videoElement);
      }

      (playerRef.current = videojs(videoElement, options, () => {
        if (videoRef.current) {
          dispatch(setVideoHeight(videoRef.current.offsetHeight))
        }
        console.log("player is ready");
      }));

    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [videoRef, dispatch]);

  useEffect(() => {
    return () => {
      const player = playerRef.current;
      if (player) {
        player.dispose();
        playerRef.current = undefined;
      }
    };
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (playerRef.current) {
      const currentTime = playerRef.current.currentTime();

      if (typeof currentTime === "number" && !isNaN(currentTime)) {
        const subtitleList = store.getState().app.subtitleList
        if (subtitleList.length) {
          const subtitle = subtitleList.find(info => {
            const startTime = convertTimeToSeconds(info.startTime)
            const endTime = convertTimeToSeconds(info.endTime)
            const currentTimeNumber = parseFloat(currentTime.toFixed(3))
            return currentTimeNumber > startTime && currentTimeNumber < endTime
          })

          if (subtitle) {
            dispatch(setCurrentSubtitle(subtitle))
          }
        }

        dispatch(setCurrentTime(currentTime.toFixed(3)))
      }
    }
  }, [dispatch, store])

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.on('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.off('timeupdate', handleTimeUpdate);
      }
    };
  }, [handleTimeUpdate]);

  return (
    <div className="video-component" data-vjs-player>
      <MeasureHeight onHeightChange={(height: number) => {
        dispatch(setVideoHeight(height))
      }}>
        <div ref={videoRef} />
      </MeasureHeight>
    </div>
  );
};

export default VideoJS;
