const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const TOP_TRACKS_ENDPOINT =
  'https://api.spotify.com/v1/me/top/tracks?limit=20&time_range=short_term';

async function getAccessToken() {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  });

  return res.json();
}

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    return res.status(200).end();
  }

  try {
    const { access_token } = await getAccessToken();

    const response = await fetch(TOP_TRACKS_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    const data = await response.json();

    const tracks =
      data.items?.map((track: any) => ({
        title: track.name,
        artist: track.artists.map((a: any) => a.name).join(', '),
        coverUrl: track.album.images[1]?.url || track.album.images[0]?.url,
        albumName: track.album.name,
        spotifyUrl: track.external_urls.spotify,
      })) || [];

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=1800'
    );
    res.setHeader('Access-Control-Allow-Origin', '*');

    return res.status(200).json({ tracks });
  } catch (err: any) {
    console.error('Spotify API error:', err);
    return res.status(500).json({ error: err.message, tracks: [] });
  }
}
