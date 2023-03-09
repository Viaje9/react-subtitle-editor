import { useState, useRef, ChangeEvent } from "react";
import { srtToJson } from "@/utils/srtToJson";
import VideoComponent from "../video/video.component";
import "./app.css";
import { useDispatch } from "react-redux";
import { initSubtitle } from "@/store/app/action";

function App() {
  const dispatch = useDispatch()
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Set the selected file to state
    if (event.target.files && event.target.files.length > 0) {
      var file = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {

        if (typeof e.target?.result === "string") {
          const subtitleList = srtToJson(e.target?.result);
          dispatch(initSubtitle({ subtitleList }))
        } else {
          alert('請傳入srt')
        }

      }, false);
      reader.readAsText(file);
    }
  };

  return (
    <div className="App">
      {/* <VideoComponent></VideoComponent> */}
      <input onChange={handleFileChange} type="file" accept=".srt" />
    </div>
  );
}


export default App;
