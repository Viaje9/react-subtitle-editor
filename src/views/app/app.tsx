import { useState, useRef, ChangeEvent } from "react";
import { srtToJson } from "@/utils/srtToJson";
import VideoComponent from "../video/video.component";
import "./app.css";
import { useDispatch } from "react-redux";
import { initSubtitle } from "@/store/app/action";
import { UploadComponent } from "../upload/upload.component";
import { SubtitleListComponent } from "../subtitle-list/subtitle-list.component";

function App() {

  return (
    <div className="App">
      <VideoComponent></VideoComponent>
      <SubtitleListComponent></SubtitleListComponent>
      <div className="bottom">
        <UploadComponent></UploadComponent>
      </div>
    </div>
  );
}


export default App;
