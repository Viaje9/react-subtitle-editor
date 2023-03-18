import React, { useRef, useEffect, useCallback, useState, createContext, useContext } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/http-streaming";
import "videojs-youtube/dist/Youtube.min.js";
import './video.css';
import MeasureSize from "@/components/ measure-size.component";
import { useDispatch, useSelector, useStore } from "react-redux";
import { onClickPlay, setCurrentSubtitle, setCurrentTime, setPlayed, setVideoHeight } from "@/store/app/action";
import { RootState } from "@/store";
import { convertTimeToSeconds } from "@/utils/time-helper";
import { SubtitleBoxComponent } from "../subtitle-box/subtitle-box.component";
import { ChangeSizeInfo } from "@/models/change-size-info";
import { VideoContext } from "../app/app";


export const useSetHandleEvent = (handleEvent: (current:number) => void) => {
  const { setHandleEvent } = useContext(VideoContext)
  useEffect(() => {
    setHandleEvent(() => handleEvent)
  }, [])
}

const VideoJS: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<videojs.Player>();
  const store = useStore<RootState>()
  const dispatch = useDispatch()
  const [width, setWidth] = useState(0)
  const { editable, onClickPlayInfo, currentTime } = useSelector((state: RootState) => state.app);

  const handleContextCallbackEvent = (currentTime:number) => {
    if (playerRef.current && currentTime) {
      playerRef.current.currentTime(currentTime)
    }
  }

  useSetHandleEvent(handleContextCallbackEvent)


  useEffect(() => {
    if (playerRef.current) {

      if (onClickPlayInfo.pending) {
        if (onClickPlayInfo.played) {
          playerRef.current.play()
        }

        if (!onClickPlayInfo.played) {
          playerRef.current.pause();
        }
        dispatch(onClickPlay({
          pending: false,
          played: onClickPlayInfo.played
        }))
      }

    }
  }, [onClickPlayInfo, editable, dispatch])


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (playerRef.current && !editable) {
        const currentTime = playerRef.current.currentTime();

        if (event.code === 'ArrowRight') {
          const newTime = parseFloat((currentTime + 0.2).toFixed(3));
          playerRef.current.currentTime(newTime)
          return
        }

        if (event.code === 'ArrowLeft') {
          const newTime = parseFloat((currentTime - 0.2).toFixed(3));
          playerRef.current.currentTime(newTime)
          return
        }

        if (event.code === 'Space') {
          if (playerRef.current.paused()) {
            playerRef.current.play()
            return
          }

          if (!playerRef.current.paused()) {
            playerRef.current.pause();
            return
          }
        }

      }

    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [editable, currentTime]);

  useEffect(() => {
    const options = {
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: true,
      // techOrder: ["youtube"],
      sources: [
        {
          // type: "video/youtube",
          type: 'video/mp4',
          src: "/videos/Mina Okabe - Every Second (Lyric Video).mp4",
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
        handleTimeUpdate()
        dispatch(setPlayed(true))
      })

      playerRef.current.on('pause', () => {
        handleTimeUpdate()
        dispatch(setPlayed(false))
      })
    }


    return () => {
      if (playerRef.current) {
        playerRef.current.off('timeupdate', handleTimeUpdate);
      }
    };
  }, [handleTimeUpdate, dispatch]);

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
