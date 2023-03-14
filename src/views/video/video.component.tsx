import React, { useRef, useEffect, useCallback, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/http-streaming";
import "videojs-youtube/dist/Youtube.min.js";
import './video.css';
import MeasureSize from "@/components/ measure-size.component";
import { useDispatch, useSelector, useStore } from "react-redux";
import { setCurrentSubtitle, setCurrentTime, setPlayed, setVideoHeight } from "@/store/app/action";
import { RootState } from "@/store";
import { convertTimeToSeconds } from "@/utils/time-helper";
import { SubtitleBoxComponent } from "../subtitle-box/subtitle-box.component";
import { ChangeSizeInfo } from "@/models/change-size-info";


const VideoJS: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>();
  const store = useStore<RootState>()
  const dispatch = useDispatch()
  const [width, setWidth] = useState(0)
  const { editable } = useSelector((state: RootState) => state.app);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (playerRef.current && !editable) {
        const currentTime = playerRef.current.currentTime();

        if (event.code === 'ArrowRight') {
          const newTime = parseFloat((currentTime + 0.3).toFixed(3));
          playerRef.current.currentTime(newTime)
        }

        if (event.code === 'ArrowLeft') {
          const newTime = parseFloat((currentTime - 0.3).toFixed(3));
          playerRef.current.currentTime(newTime)
        }

        if (event.code === 'Space') {
          if (playerRef.current.paused()) {
            playerRef.current.play()
          }

          if (!playerRef.current.paused()) {
            playerRef.current.pause();
          }
        }

      }

    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [editable]);

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
      youtube: {
        disablekb: 1
      }
    };

    if (!playerRef.current) {
      const videoElement = document.createElement("video");
      videoElement.classList.add("video-js", "vjs-big-play-centered");

      if (videoRef.current) {
        videoRef.current.appendChild(videoElement);
      }


      (playerRef.current = videojs(videoElement, options, function () {
        this.playbackRate(1);
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
      playerRef.current.on('play', () => {
        dispatch(setPlayed(true))

      })

      playerRef.current.on('pause', () => {
        dispatch(setPlayed(false))
      })
    }


    return () => {
      if (playerRef.current) {
        playerRef.current.off('timeupdate', handleTimeUpdate);
      }
    };
  }, [handleTimeUpdate]);

  return (
    <div ref={containerRef} className="video-component" data-vjs-player>
      <MeasureSize onSizeChange={(changeSizeInfo: ChangeSizeInfo) => {
        dispatch(setVideoHeight(changeSizeInfo.height))
        setWidth(changeSizeInfo.width)
      }}>
        <div ref={videoRef} />
      </MeasureSize>
      <SubtitleBoxComponent parentRef={containerRef} parentWidth={width}></SubtitleBoxComponent>
    </div>
  );
};

export default VideoJS;
