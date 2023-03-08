import { useState } from "react";
import { srtToJson } from "@/utils/srtToJson";

function App() {
  const [count, setCount] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Set the selected file to state
    if (event.target.files && event.target.files.length > 0) {
      var file = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function (e) {
          const text = srtToJson(e.target?.result as string);

          console.log(text);
        },
        false
      );
      reader.readAsText(file);
    }
  };

  return (
    <div className="App">
      {/* <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/_fXMNk4IAMQ"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe> */}
      <input onChange={handleFileChange} type="file" />
    </div>
  );
}

export default App;
