import VideoComponent from "../video/video.component";
import "./app.css";
import { UploadComponent } from "../upload/upload.component";
import { SubtitleListComponent } from "../subtitle-list/subtitle-list.component";
import { EditorSubtitleComponent } from "../editor-subtitle/editor-subtitle.component";
import { EditorBarComponent } from "../editor-bar/editor-bar.component";
import { createContext, useContext, useState } from "react";

export const VideoContext = createContext<{
  handleEvent: (current: number) => void;
  setHandleEvent: React.Dispatch<() => void>;
}>({
  handleEvent: () => { return },
  setHandleEvent: () => { return }
});

function App() {
  const [handleEvent, setHandleEvent] = useState(() => () => { return });
  return (
    <VideoContext.Provider value={{ handleEvent, setHandleEvent }}>
      <div className="app">
        <div className="videoContainer">
          <VideoComponent></VideoComponent>
        </div>
        <div className="bottom">
          <EditorBarComponent></EditorBarComponent>
          <SubtitleListComponent></SubtitleListComponent>
        </div>
      </div>
    </VideoContext.Provider>
  );
}


export default App;
