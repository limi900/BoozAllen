"use client";
import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      //waiting from the backend api to retrieve the image
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Recyclable: ${data.recyclable} (Catagory: ${data.label})`);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("An error occurred while uploading.");
      console.error("Upload error:", error);  
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-200 to-blue-200 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center">
        EcoRecyclr <span className="ml-2">♻️</span>
      </h1>

      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg h-48 flex items-center justify-center bg-white bg-opacity-20 rounded-xl my-5">
        {preview ? 
        <img src={preview} alt="preview" className="w-full h-full rounded-xl object-cover" /> 
        : 
        <p className="text-gray-300">Preview of Image</p>
        }
      </div>

      <div className="flex items-center mb-4">
        <label htmlFor="fileInput" className="text-black bg-gray-300 hover:bg-gray-400 font-bold py-2 px-6 rounded-md cursor-pointer">
          Choose File
        </label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        {fileName && (
          <span className="ml-4 text-white text-sm">{fileName}</span>
        )}
      </div>
      
      <button onClick={handleUpload} className="w-full max-w-xs md:max-w-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md text-sm md:text-lg">
        Upload
      </button>

      {message && <p className="mt-4 text-black">{message}</p>}
    </div>
  );
}
