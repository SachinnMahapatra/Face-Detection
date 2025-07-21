import { useRef, useState } from 'react';

/**
 * useRecorder custom hook
 * - Manages MediaRecorder for a canvas stream
 * - Provides start, stop, and state
 * - Returns video URL (blob) and recording state
 *
 * @param {object} canvasRef - React ref to the canvas element
 * @returns {object} { startRecording, stopRecording, videoUrl, isRecording }
 */
export default function useRecorder(canvasRef) {
  const mediaRecorderRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const chunksRef = useRef([]);

  const startRecording = () => {
    if (!canvasRef.current) return;
    const stream = canvasRef.current.captureStream();
    const mediaRecorder = new window.MediaRecorder(stream, { mimeType: 'video/webm' });
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      setVideoUrl(URL.createObjectURL(blob));
    };
    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return { startRecording, stopRecording, videoUrl, isRecording };
} 