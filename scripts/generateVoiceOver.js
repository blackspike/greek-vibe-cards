import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error('Error: ELEVENLABS_API_KEY environment variable is not set');
  process.exit(1);
}

const VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // Rachel voice - good for Greek
const TEXT = 'γεια σας';

// Ensure the voice-over directory exists
const voiceOverDir = path.join(__dirname, '../public/voice-over');
if (!fs.existsSync(voiceOverDir)) {
  fs.mkdirSync(voiceOverDir, { recursive: true });
}

const options = {
  hostname: 'api.elevenlabs.io',
  path: `/v1/text-to-speech/${VOICE_ID}`,
  method: 'POST',
  headers: {
    'Accept': 'audio/mpeg',
    'Content-Type': 'application/json',
    'xi-api-key': API_KEY
  }
};

const data = JSON.stringify({
  text: TEXT,
  model_id: 'eleven_multilingual_v2',
  voice_settings: {
    stability: 0.5,
    similarity_boost: 0.75
  }
});

const req = https.request(options, (res) => {
  const filePath = path.join(voiceOverDir, 'biblio.mp3');
  const fileStream = fs.createWriteStream(filePath);

  res.pipe(fileStream);

  fileStream.on('finish', () => {
    fileStream.close();
    console.log('Audio file saved successfully!');
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end();