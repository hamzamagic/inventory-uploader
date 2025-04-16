import { fileInput, transcriptionBox } from "./index.astro.0.mts";

export async function processAudioForTranscription() {
const files = Array.from(fileInput.files);
const audioFile = files.find(f => f.type.startsWith('audio/'));
if (!audioFile) return;

const formData = new FormData();
formData.append('file', audioFile);
formData.append('model', 'whisper-1');

transcriptionBox.value = 'Transcribing...';

try {
const response = await fetch('/api/transcribe', {
method: 'POST',
body: formData
});
const data = await response.json();
transcriptionBox.value = data.text;
} catch (err) {
transcriptionBox.value = 'Error transcribing audio.';
console.error(err);
}
}
