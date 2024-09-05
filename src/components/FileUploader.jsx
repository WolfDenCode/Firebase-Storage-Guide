import React, { useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import app from "..";

const FileUploader = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      console.log("Uploading file...");

      // Create a root reference
      const storage = getStorage(app);

      // Create a reference to 'images/<file_name>'
      const fileImageRef = ref(storage, `images/${file.name}`);

      // Upload file
      await uploadBytes(fileImageRef, file);
      console.log("Uploaded a blob or file!");

      // Reset the file input and state
      setFile(null);
      document.getElementById("file").value = ""; // Reset file input field

      // Trigger re-fetch in the FileFetcher component
      if (onUpload) {
        onUpload();
      }
    }
  };

  return (
    <>
      <div className="input-group">
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          <p>File details:</p>
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}
      {file && (
        <button onClick={handleUpload} className="submit">
          Upload a file
        </button>
      )}
    </>
  );
};

export default FileUploader;
