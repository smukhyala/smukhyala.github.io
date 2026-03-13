/**
 * One-time script to get a Spotify refresh token.
 *
 * Steps:
 * 1. Go to https://developer.spotify.com/dashboard and create an app
 * 2. Set redirect URI to: http://localhost:3000/callback
 * 3. Copy your Client ID and Client Secret
 * 4. Run: SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/get-refresh-token.mjs
 * 5. Open the URL it prints in your browser
 * 6. After authorizing, you'll be redirected — copy the `code` param from the URL
 * 7. Paste it when prompted
 */

import http from 'node:http';
import { URL } from 'node:url';
import readline from 'node:readline';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'http://127.0.0.1:3000/callback';
const SCOPES = 'user-top-read user-read-recently-played';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    '\nUsage:\n  SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/get-refresh-token.mjs\n'
  );
  process.exit(1);
}

const authUrl = new URL('https://accounts.spotify.com/authorize');
authUrl.searchParams.set('client_id', CLIENT_ID);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
authUrl.searchParams.set('scope', SCOPES);

console.log('\n1. Open this URL in your browser:\n');
console.log(`   ${authUrl.toString()}\n`);
console.log('2. Authorize the app, then you\'ll be redirected to localhost:3000');
console.log('   The server below will capture the code automatically.\n');

// Start a local server to capture the callback
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:3000`);

  if (url.pathname === '/callback') {
    const code = url.searchParams.get('code');

    if (!code) {
      res.writeHead(400);
      res.end('No code found in callback');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Got it! Check your terminal.</h1><p>You can close this tab.</p>');

    // Exchange code for tokens
    try {
      const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

      const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI,
        }),
      });

      const data = await tokenRes.json();

      if (data.error) {
        console.error('\nError:', data.error, data.error_description);
      } else {
        console.log('\n✓ Success! Here are your tokens:\n');
        console.log(`  SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
        console.log('Add these to your Vercel environment variables:');
        console.log(`  SPOTIFY_CLIENT_ID=${CLIENT_ID}`);
        console.log(`  SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}`);
        console.log(`  SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
        console.log('\nRun: vercel env add SPOTIFY_REFRESH_TOKEN\n');
      }
    } catch (err) {
      console.error('\nFailed to exchange code:', err);
    }

    server.close();
    process.exit(0);
  }
});

server.listen(3000, () => {
  console.log('Listening on http://localhost:3000 for the callback...\n');
});
