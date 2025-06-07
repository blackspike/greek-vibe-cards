import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { greekAlphabet } from '../app/data/greekAlphabet.js';

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

// Ensure the voice-over directory exists
const voiceOverDir = path.join(__dirname, '../public/voice-over');
if (!fs.existsSync(voiceOverDir)) {
  fs.mkdirSync(voiceOverDir, { recursive: true });
}

// Get unique example words (only uppercase versions to avoid duplicates)
const uniqueExamples = greekAlphabet
  .filter(item => item.letter === item.letter.toUpperCase()) // Only uppercase letters
  .map(item => ({
    greek: item.example.greek,
    english: item.example.english.toLowerCase()
  }));

// Function to generate a single voice-over
function generateVoiceOver(greekText, englishName) {
  return new Promise((resolve, reject) => {
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
      text: greekText,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75
      }
    });

    const req = https.request(options, (res) => {
      const filePath = path.join(voiceOverDir, `${englishName}.mp3`);
      const fileStream = fs.createWriteStream(filePath);

      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Generated: ${englishName}.mp3`);
        resolve();
      });
    });

    req.on('error', (error) => {
      console.error(`Error generating ${englishName}.mp3:`, error);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

// Generate all voice-overs with a delay between requests
async function generateAllVoiceOvers() {
  console.log('Starting voice-over generation...');

  for (const example of uniqueExamples) {
    try {
      await generateVoiceOver(example.greek, example.english);
      // Add a small delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Failed to generate ${example.english}.mp3:`, error);
    }
  }

  console.log('Voice-over generation complete!');
}

// Run the generation
generateAllVoiceOvers();