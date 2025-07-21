"use client";
import React, { useRef, useEffect } from 'react';
import useFaceTracking from '../hooks/useFaceTracking';

/**
 * FaceTracker component
 * - Shows webcam video
 * - Overlays a canvas for face marker
 * - Uses useFaceTracking hook for detection
 */
export default function FaceTracker() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { landmarks, loading, error } = useFaceTracking(videoRef);

  // Draw video frame and bounding box overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas?.getContext('2d');
    let animationId;
    if (!canvas || !ctx || !video) return;

    function draw() {
      // Draw the current video frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
      // Draw bounding box if landmarks are present
      if (landmarks) {
        const positions = landmarks.positions;
        if (positions && positions.length > 0) {
          let minX = positions[0].x, minY = positions[0].y, maxX = positions[0].x, maxY = positions[0].y;
          for (let i = 1; i < positions.length; i++) {
            minX = Math.min(minX, positions[i].x);
            minY = Math.min(minY, positions[i].y);
            maxX = Math.max(maxX, positions[i].x);
            maxY = Math.max(maxY, positions[i].y);
          }
          // Scale coordinates to canvas size
          const scaleX = canvas.width / video.videoWidth;
          const scaleY = canvas.height / video.videoHeight;
          ctx.beginPath();
          ctx.lineWidth = 4;
          ctx.strokeStyle = 'red';
          ctx.rect(minX * scaleX, minY * scaleY, (maxX - minX) * scaleX, (maxY - minY) * scaleY);
          ctx.stroke();
        }
      }
      animationId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationId);
  }, [landmarks]);

  // Resize canvas to match video
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    function resize() {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }
    video.addEventListener('loadedmetadata', resize);
    return () => video.removeEventListener('loadedmetadata', resize);
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full max-w-md aspect-video bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
      </div>
      {loading && <p className="mt-2 text-sm text-blue-500">Loading face detection...</p>}
      {error && <p className="mt-2 text-sm text-red-500">Error: {error}</p>}
      {!loading && !error && <p className="mt-2 text-sm text-gray-500">Webcam + Face Marker Overlay</p>}
    </div>
  );
} 