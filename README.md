# Face Detection + Video Recording Web App

**[Live Demo on Vercel](https://face-detection-ashy-eight.vercel.app/)**

A premium, modern web app for real-time face tracking and video recording using Next.js, face-api.js, and Tailwind CSS.

## Features
- Real-time face detection and tracking (face-api.js)
- Webcam + face overlay recording (canvas + MediaRecorder)
- Save and load videos using localStorage
- Responsive, clean UI

## Getting Started

### 1. Install dependencies
```sh
npm install
```

### 2. Start the development server
```sh
npm run dev
```

### 3. Open the app in your browser
- Visit: [http://localhost:3000](http://localhost:3000)
- **Recommended:** Use **Firefox** for best webcam compatibility (especially for MediaRecorder and canvas capture).
- Allow camera access when prompted.

## Usage
- Click **Start Recording** to record your webcam and face overlay.
- Click **Stop Recording** to finish.
- Click **Save** to store the video in your browser (localStorage).
- Click **Load Last** to view your last saved video.

## Notes
- Make sure your webcam is connected and not used by another app.
- All video data is stored locally in your browser (not uploaded).

---

**Enjoy your face tracking and video recording experience!**
