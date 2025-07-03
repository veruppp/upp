// App.jsx
import React, { useState } from "react";
import { Upload, Sun, Moon, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const MAX_FILE_SIZE = 10 * 1024 * 1024 * 1024; // 10 GB

export default function App() {
  const [file, setFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const [embedCode, setEmbedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleFileChange = async (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (selected.size > MAX_FILE_SIZE) {
      alert("File size exceeds 10GB limit.");
      return;
    }

    setFile(selected);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", selected);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setMediaUrl(data.secure_url);

      const isVideo = data.resource_type === "video";
      const code = isVideo
        ? `<iframe src="${data.secure_url}" frameborder="0" allowfullscreen width="560" height="315"></iframe>`
        : `<img src="${data.secure_url}" alt="Uploaded Media" />`;

      setEmbedCode(code);
    } catch (err) {
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 p-6 ${
        theme === "light" ? "bg-gray-100 text-gray-900" : "bg-gray-900 text-gray-100"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cloud Media Hosting</h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {theme === "light" ? <Moon /> : <Sun />}
        </button>
      </div>

      <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
        <Upload className="w-5 h-5" /> Upload Media
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>

      {loading && (
        <div className="mt-4 text-blue-500 flex gap-2 items-center animate-pulse">
          <Loader2 className="animate-spin" /> Uploading...
        </div>
      )}

      {mediaUrl && (
        <div className="mt-6 space-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            {mediaUrl.endsWith(".mp4") || mediaUrl.includes("video") ? (
              <video src={mediaUrl} controls className="w-full rounded" />
            ) : (
              <img src={mediaUrl} alt="Uploaded" className="w-full rounded" />
            )}
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl text-sm font-mono break-all">
            <strong>Embed HTML:</strong>
            <pre>{embedCode}</pre>
          </div>
          <a
            href={mediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            🔗 View Public Link
          </a>
        </div>
      )}
    </div>
  );
}
