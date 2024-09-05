import React, { useEffect, useState } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import app from "..";

const FileFetcher = ({ refresh }) => {
  const [files, setFiles] = useState([]);

  const fetchFromStorage = async () => {
    try {
      // Initialize Firebase Storage
      const storage = getStorage(app);

      // Reference to the directory containing images
      const listRef = ref(storage, "images/");

      // List all files in the directory
      const res = await listAll(listRef);

      // Fetch URLs for each file and store them in an array
      const urls = await Promise.all(
        res.items.map((itemRef) => getDownloadURL(itemRef))
      );

      // Set the URLs in state
      setFiles(urls);
    } catch (error) {
      console.error("Error fetching files from storage:", error);
    }
  };

  useEffect(() => {
    fetchFromStorage();
  }, [refresh]); // Trigger fetch when `refresh` changes

  return (
    <div>
      <h2>Fetched Images</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {files.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`file-${index}`}
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              margin: "5px",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FileFetcher;
