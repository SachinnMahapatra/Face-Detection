"use client";

import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

/**
 * Custom hook for face tracking using face-api.js
 * @param {object} videoRef - Ref to the video element
 * @param {number} intervalMs - Interval for face detection loop (default: 500ms)
 * @returns {object} { landmarks, loading, error }
 */
export default function useFaceTracking(videoRef, intervalMs = 500) {
  const [landmarks, setLandmarks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    async function loadModels() {
      try {
        const MODEL_URL = '/models';
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
        ]);
      } catch (err) {
        throw new Error('Failed to load face-api.js models');
      }
    }

    async function startWebcam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        throw new Error('Unable to access webcam: ' + err.message);
      }
    }

    async function startTracking() {
      intervalRef.current = setInterval(async () => {
        try {
          const video = videoRef.current;
          if (video && !video.paused && video.readyState === 4) {
            const detection = await faceapi
              .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
              .withFaceLandmarks(true);

            setLandmarks(detection?.landmarks || null);
          }
        } catch {
          // Silent fail for detection errors
        }
      }, intervalMs);
    }

    async function init() {
      setLoading(true);
      try {
        await loadModels();
        await startWebcam();
        await startTracking();
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    init();

    return () => {
      // Cleanup on unmount
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoRef, intervalMs]);

  return { landmarks, loading, error };
}
