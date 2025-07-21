"use client";
import React, { useRef, useState, useEffect } from 'react';
import useRecorder from '../hooks/useRecorder';
import { saveVideoToStorage, loadVideoFromStorage } from '../utils/storage';

const STORAGE_KEY = 'face-video';

/**
 * VideoRecorder component
 * - Records the FaceTracker canvas
 * - Shows Start/Stop buttons and video preview
 * - Can save/load video to/from localStorage
 */
export default function VideoRecorder() {
  const canvasRef = useRef(null);
  const [savedVideoUrl, setSavedVideoUrl] = useState(null);

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvasRef.current = canvas;
    }
  }, []);

  useEffect(() => {
    const blob = loadVideoFromStorage(STORAGE_KEY);
    if (blob) {
      setSavedVideoUrl(URL.createObjectURL(blob));
    }
  }, []);

  const { startRecording, stopRecording, videoUrl, isRecording } = useRecorder(canvasRef);

  const handleSave = async () => {
    if (!videoUrl) return;
    const response = await fetch(videoUrl);
    const blob = await response.blob();
    await saveVideoToStorage(STORAGE_KEY, blob);
    setSavedVideoUrl(videoUrl);
  };

  const handleLoad = () => {
    const blob = loadVideoFromStorage(STORAGE_KEY);
    if (blob) {
      setSavedVideoUrl(URL.createObjectURL(blob));
    }
  };

  return (
    <div className="w-full max-w-xl p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span role="img" aria-label="video">🎥</span> Video Recorder
      </h2>
      <div className="flex flex-wrap gap-3 mb-4 w-full justify-center">
        <button
          onClick={startRecording}
          disabled={isRecording}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition disabled:opacity-50"
        >
          <span role="img" aria-label="record">⏺️</span> Start
        </button>
        <button
          onClick={stopRecording}
          disabled={!isRecording}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition disabled:opacity-50"
        >
          <span role="img" aria-label="stop">⏹️</span> Stop
        </button>
        <button
          onClick={handleSave}
          disabled={!videoUrl}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition disabled:opacity-50"
        >
          <span role="img" aria-label="save">💾</span> Save
        </button>
        <button
          onClick={handleLoad}
          className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow transition"
        >
          <span role="img" aria-label="load">📂</span> Load Last
        </button>
      </div>
      <div className="w-full flex flex-col items-center">
        {videoUrl && (
          <div className="w-full max-w-md mt-2 rounded-xl overflow-hidden border-2 border-blue-200 shadow">
            <video
              src={videoUrl}
              controls
              className="w-full h-64 object-contain bg-black"
            />
            <div className="bg-blue-50 text-blue-700 text-xs px-3 py-1">Current Recording</div>
          </div>
        )}
        {savedVideoUrl && !videoUrl && (
          <div className="w-full max-w-md mt-2 rounded-xl overflow-hidden border-2 border-gray-200 shadow">
            <video
              src={savedVideoUrl}
              controls
              className="w-full h-64 object-contain bg-black"
            />
            <div className="bg-gray-50 text-gray-700 text-xs px-3 py-1">Last Saved Video</div>
          </div>
        )}
      </div>
      <p className="text-gray-500 mt-4 text-sm text-center">
        Record your webcam + face overlay above. Save and load your last video using localStorage.
      </p>
    </div>
  );
} 