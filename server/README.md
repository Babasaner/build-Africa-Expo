DeepL Proxy

This is a minimal Express proxy that forwards translation requests to the DeepL API using a server-side API key.

Usage

1. Install dependencies:

```bash
cd server
npm install
```

2. Set environment variables (do not commit your key):

```
DEEPL_API_KEY=your_deepl_auth_key_here
PORT=3000
```

3. Start the proxy:

```bash
npm start
```

4. In your Vite app, set `VITE_DEEPL_PROXY` to the proxy URL (for dev):

```
VITE_DEEPL_PROXY=http://localhost:3000/translate
```

Then the client will POST `{ text, target_lang }` to the proxy, which forwards to DeepL and returns DeepL's JSON.
