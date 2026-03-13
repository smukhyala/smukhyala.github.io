import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface ExperienceDetails {
  organization?: string;
  role?: string;
  period?: string;
  location?: string;
  description?: string;
  items?: string[];
  tech?: string[];
}

interface Experience {
  title: string;
  category: string;
  color: string;
  details: ExperienceDetails;
}

interface ExperienceBookProps {
  experience: Experience;
  index: number;
}

export function ExperienceBook({ experience, index }: ExperienceBookProps) {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current || isOpen) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const { title, category, color, details } = experience;

  // Determine text color based on background luminance
  const isLight = getLuminance(color) > 0.5;
  const textColor = isLight ? '#1a1a1a' : '#fafaf8';
  const textMuted = isLight ? 'rgba(26,26,26,0.6)' : 'rgba(250,250,248,0.6)';

  return (
    <motion.div
      ref={cardRef}
      className="w-full cursor-pointer"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className="relative w-full rounded-sm overflow-hidden"
        style={{
          rotateX: isOpen ? 0 : rotateX,
          rotateY: isOpen ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={!isOpen ? { scale: 1.015, y: -4 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Book cover */}
        <motion.div
          className="relative p-8 md:p-10"
          style={{ backgroundColor: color }}
          animate={{ minHeight: isOpen ? 'auto' : '160px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Spine accent */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1.5"
            style={{ backgroundColor: textColor, opacity: 0.15 }}
          />

          {/* Volume number */}
          <span
            className="absolute top-6 right-8 font-[--font-display] text-7xl font-black leading-none select-none"
            style={{ color: textColor, opacity: 0.07 }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Category label */}
          <span
            className="font-[--font-ui] text-[11px] font-medium uppercase tracking-[2px] block mb-3"
            style={{ color: textMuted }}
          >
            {category}
          </span>

          {/* Title */}
          <h3
            className="font-[--font-display] text-2xl md:text-3xl font-bold leading-tight mb-1"
            style={{ color: textColor }}
          >
            {title}
          </h3>

          {/* Role & period */}
          {details.role && (
            <p
              className="font-[--font-ui] text-sm italic mb-0.5"
              style={{ color: textMuted }}
            >
              {details.role}
            </p>
          )}
          {details.period && (
            <p
              className="font-[--font-ui] text-xs uppercase tracking-[1.5px]"
              style={{ color: textMuted }}
            >
              {details.period}
              {details.location && ` · ${details.location}`}
            </p>
          )}

          {/* Expanded content */}
          <motion.div
            initial={false}
            animate={{
              height: isOpen ? 'auto' : 0,
              opacity: isOpen ? 1 : 0,
              marginTop: isOpen ? 24 : 0,
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            {details.description && (
              <p
                className="font-[--font-body] text-base leading-relaxed mb-4"
                style={{ color: textColor, opacity: 0.9 }}
              >
                {details.description}
              </p>
            )}

            {details.items && details.items.length > 0 && (
              <ul className="space-y-2 mb-4">
                {details.items.map((item, i) => (
                  <li
                    key={i}
                    className="font-[--font-body] text-[15px] leading-relaxed pl-5 relative"
                    style={{ color: textColor, opacity: 0.85 }}
                  >
                    <span
                      className="absolute left-0"
                      style={{ color: textMuted }}
                    >
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {details.tech && details.tech.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {details.tech.map((t, i) => (
                  <span
                    key={i}
                    className="font-[--font-ui] text-xs px-3 py-1 rounded-sm border"
                    style={{
                      color: textColor,
                      borderColor: `${textColor}22`,
                      opacity: 0.8,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Click hint */}
            <p
              className="font-[--font-ui] text-[11px] uppercase tracking-[2px] mt-6"
              style={{ color: textMuted }}
            >
              Click to collapse
            </p>
          </motion.div>

          {/* Closed hint */}
          {!isOpen && (
            <motion.p
              className="font-[--font-ui] text-[11px] uppercase tracking-[2px] mt-4"
              style={{ color: textMuted }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Click to read more
            </motion.p>
          )}

          {/* Book edge shadow (bottom) */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{
              background: `linear-gradient(to bottom, transparent, ${textColor}15)`,
            }}
          />
        </motion.div>

        {/* Book shadow / depth effect */}
        <div
          className="h-2 mx-2 rounded-b-sm"
          style={{
            background: `linear-gradient(to bottom, ${color}cc, ${color}44)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

function getLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return 0.299 * r + 0.587 * g + 0.114 * b;
}
