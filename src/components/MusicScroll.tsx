import { useEffect, useState } from 'react';
import { AlbumCard } from './AlbumCard';

interface Track {
  title: string;
  artist: string;
  coverUrl: string;
  albumName?: string;
  spotifyUrl?: string;
}

const fallbackAlbums: Track[] = [
  { title: 'Blonde', artist: 'Frank Ocean', coverUrl: 'https://i.scdn.co/image/ab67616d00001e02c5649add07ed3720be9d5526' },
  { title: 'good kid, m.A.A.d city', artist: 'Kendrick Lamar', coverUrl: 'https://i.scdn.co/image/ab67616d00001e02d58e537cea05c2156792c53d' },
  { title: 'Freudian', artist: 'Daniel Caesar', coverUrl: 'https://i.scdn.co/image/ab67616d00001e02635c3002835ad498d75bb844' },
  { title: 'DAMN.', artist: 'Kendrick Lamar', coverUrl: 'https://i.scdn.co/image/ab67616d00001e028b52c6b9bc4e43d873869699' },
  { title: '2014 Forest Hills Drive', artist: 'J. Cole', coverUrl: 'https://i.scdn.co/image/ab67616d00001e02c6e0948bbb0681ff29cdbae8' },
  { title: 'channel ORANGE', artist: 'Frank Ocean', coverUrl: 'https://i.scdn.co/image/ab67616d00001e02ee0e0994d1a1689a6a86e150' },
  { title: 'To Pimp a Butterfly', artist: 'Kendrick Lamar', coverUrl: 'https://i.scdn.co/image/ab67616d00001e02cdb645498cd3d8a2db4d05e1' },
  { title: 'SOS', artist: 'SZA', coverUrl: 'https://i.scdn.co/image/ab67616d00001e0270dbc9f47669d120ad874ec1' },
  { title: 'Ctrl', artist: 'SZA', coverUrl: 'https://i.scdn.co/image/ab67616d00001e024753b6a237da4921a890b3b2' },
  { title: 'GNX', artist: 'Kendrick Lamar', coverUrl: 'https://i.scdn.co/image/ab67616d00001e02d9985092cd88bffd97653b58' },
  { title: 'The Off-Season', artist: 'J. Cole', coverUrl: 'https://i.scdn.co/image/ab67616d00001e0295d3407db67a08953c4bbd14' },
  { title: 'Battle Studies', artist: 'John Mayer', coverUrl: 'https://i.scdn.co/image/ab67616d00001e02cce197ee4dba01447e5a4077' },
];

export function MusicScroll() {
  const [tracks, setTracks] = useState<Track[]>(fallbackAlbums);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    fetch('/api/spotify')
      .then((res) => {
        if (!res.ok) throw new Error('API not available');
        return res.json();
      })
      .then((data) => {
        if (data.tracks && data.tracks.length > 0) {
          setTracks(data.tracks);
          setIsLive(true);
        }
      })
      .catch(() => {
        // Fallback data is already set
      });
  }, []);

  return (
    <div className="w-full py-16 border-y border-white/[0.05]">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="font-[--font-ui] text-[11px] uppercase tracking-[2px] text-white/20">
          {isLive ? 'My Top Tracks Right Now' : 'Currently Listening'}
        </h2>
        {isLive && (
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="font-[--font-ui] text-[10px] text-green-500/60 uppercase tracking-wider">
              Live from Spotify
            </span>
          </div>
        )}
      </div>

      {/* Horizontal scroll container */}
      <div className="relative">
        <div className="overflow-x-auto scrollbar-hide px-8">
          <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
            {tracks.map((track, index) => (
              <AlbumCard
                key={`${track.title}-${index}`}
                title={track.title}
                artist={track.artist}
                coverUrl={track.coverUrl}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Fade edges */}
        <div className="absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-neutral-950 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-neutral-950 to-transparent pointer-events-none" />
      </div>

      {/* Hint */}
      <div className="text-center mt-6">
        <p className="font-[--font-ui] text-white/20 text-[11px] tracking-wide">
          Scroll to explore →
        </p>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
