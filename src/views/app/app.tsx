import VideoComponent from "../video/video.component";
import "./app.css";
import { UploadComponent } from "../upload/upload.component";
import { SubtitleListComponent } from "../subtitle-list/subtitle-list.component";
import { EditorSubtitleComponent } from "../editor-subtitle/editor-subtitle.component";
import { EditorBarComponent } from "../editor-bar/editor-bar.component";

function App() {
  return (
    <div className="app">
      <div className="videoContainer">
        <VideoComponent></VideoComponent>
      </div>
      <div className="bottom">
        <EditorBarComponent></EditorBarComponent>
        <SubtitleListComponent></SubtitleListComponent>
      </div>
    </div>
  );
}


export default App;
