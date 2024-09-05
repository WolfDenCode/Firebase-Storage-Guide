import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FileUploader from "./components/FileUploader";
import FileFetcher from "./components/FileFetcher";

function App() {
  const [refresh, setRefresh] = useState(false);

  // Function to toggle refresh
  const handleUpload = () => {
    setRefresh((prev) => !prev); // Toggle refresh state to trigger re-fetch
  };
  return (
    <>
      <FileUploader onUpload={handleUpload}></FileUploader>
      <FileFetcher refresh={refresh}></FileFetcher>
    </>
  );
}

export default App;
