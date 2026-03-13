import { motion } from 'motion/react';

interface AlbumCardProps {
  title: string;
  artist: string;
  coverUrl: string;
  index: number;
}

export function AlbumCard({ title, artist, coverUrl, index }: AlbumCardProps) {
  return (
    <motion.div
      className="shrink-0 w-48 group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.div
        className="relative overflow-hidden rounded-sm mb-3 aspect-square"
        whileHover={{ scale: 1.04, y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <img
          src={coverUrl}
          alt={`${title} by ${artist}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        {/* Play icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-black ml-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </motion.div>
      <p className="font-[--font-ui] text-sm text-white/70 leading-tight truncate">
        {title}
      </p>
      <p className="font-[--font-ui] text-[11px] text-white/30 leading-tight truncate mt-0.5">
        {artist}
      </p>
    </motion.div>
  );
}
