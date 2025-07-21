/**
 * Save a video Blob to localStorage as a base64 string
 * @param {string} key - The localStorage key
 * @param {Blob} blob - The video blob
 * @returns {Promise<void>}
 */
export async function saveVideoToStorage(key, blob) {
  const arrayBuffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  localStorage.setItem(key, base64);
}

/**
 * Load a video Blob from localStorage (base64 string)
 * @param {string} key - The localStorage key
 * @returns {Blob|null}
 */
export function loadVideoFromStorage(key) {
  const base64 = localStorage.getItem(key);
  if (!base64) return null;
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: 'video/webm' });
} 