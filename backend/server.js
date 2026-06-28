import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.use(express.static(join(__dirname, '..')));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/chat', async (req, res) => {
  const { messages, system, max_tokens } = req.body;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  const geminiKey = process.env.GOOGLE_API_KEY;
  if (geminiKey) {
    const models = (process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite,gemini-2.5-flash,gemini-2.0-flash,gemini-3-flash-preview,gemini-2.0-flash-lite,gemini-3.5-flash,gemini-flash-latest,gemini-pro-latest').split(',');
    const badModels = new Set();

    for (let attempt = 0; attempt < 3; attempt++) {
      for (const model of models) {
        if (badModels.has(model)) continue;
        try {
          const contents = messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
          }));
          const body = { contents };
          if (system) body.systemInstruction = { parts: [{ text: system }] };
          body.generationConfig = { maxOutputTokens: Math.min((parseInt(max_tokens) || 1024) * 4, 8192), temperature: 0.7 };
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
          const data = await response.json();
          if (response.ok) {
            const reply = data.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('') || '';
            if (reply) return res.json({ reply });
          }
          if (data.error?.message?.includes('API_KEY_INVALID')) {
            return res.status(500).json({ error: 'Invalid Gemini API key. Get a free one at https://aistudio.google.com/app/apikey' });
          }
          if (data.error?.status === 'RESOURCE_EXHAUSTED' || response.status === 429) {
            continue;
          }
          badModels.add(model);
        } catch (e) {
          badModels.add(model);
        }
      }
      if (attempt < 2) await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
    }
    return res.status(429).json({ error: 'Gemini API quota exceeded. Please wait a moment and try again.' });
  }

  const anthKey = process.env.ANTHROPIC_API_KEY;
  if (anthKey) {
    try {
      const model = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514';
      const body = { model, max_tokens: max_tokens || 1024, messages };
      if (system) body.system = system;
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': anthKey, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (response.ok) {
        const reply = data.content.map(b => b.text || '').join('');
        return res.json({ reply });
      }
    } catch (e) {}
  }

  res.status(500).json({ error: 'No AI provider available. Add credits to your Anthropic account or get a fresh free Gemini key at https://aistudio.google.com/app/apikey' });
});

app.listen(PORT, () => {
  console.log(`MediTwin backend running on http://localhost:${PORT}`);
});
