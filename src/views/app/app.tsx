import VideoComponent from "../video/video.component";
import "./app.css";
import { UploadComponent } from "../upload/upload.component";
import { SubtitleListComponent } from "../subtitle-list/subtitle-list.component";
import { EditorSubtitleComponent } from "../editor-subtitle/editor-subtitle.component";

function App() {

  return (
    <div>
      <div className="App">
        <VideoComponent></VideoComponent>
        <SubtitleListComponent></SubtitleListComponent>
      </div>
      <div className="bottom">
        <EditorSubtitleComponent></EditorSubtitleComponent>
        <UploadComponent></UploadComponent>
      </div>
    </div>
  );
}


export default App;
