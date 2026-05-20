const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const DEEPL_KEY = process.env.DEEPL_API_KEY;
if (!DEEPL_KEY) {
  console.warn('Warning: DEEPL_API_KEY is not set in server environment. Requests will be rejected.');
}

app.post('/translate', async (req, res) => {
  try {
    const { text, target_lang } = req.body || {};
    if (!DEEPL_KEY) return res.status(500).json({ error: 'server_missing_deepl_key' });
    if (!text || !target_lang) return res.status(400).json({ error: 'text_and_target_lang_required' });

    const params = new URLSearchParams();
    params.append('auth_key', DEEPL_KEY);
    params.append('text', text);
    params.append('target_lang', target_lang.toUpperCase());

    const response = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      body: params,
    });

    const json = await response.json();
    res.status(response.status).json(json);
  } catch (err) {
    console.error('DeepL proxy error:', err);
    res.status(500).json({ error: 'proxy_error', detail: String(err) });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`DeepL proxy listening at http://localhost:${port}/translate`);
});
