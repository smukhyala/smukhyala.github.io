import { ExperienceBook } from './components/ExperienceBook';
import { MusicScroll } from './components/MusicScroll';

const experiences = [
  // --- Professional Experience ---
  {
    title: 'Prologis',
    category: 'Professional Experience',
    color: '#2c3e50',
    details: {
      role: 'Global Strategy & Data Analytics Intern',
      period: 'Incoming May 2026',
      location: 'San Francisco, CA',
      description: 'Joining the global strategy and data analytics team at the world\'s largest logistics real estate company.',
    },
  },
  {
    title: 'SignalOS',
    category: 'Professional Experience',
    color: '#1a1a2e',
    details: {
      role: 'Co-Founder & Head of Product',
      period: 'March 2026 – Present',
      location: 'Berkeley, CA',
      description: 'Building an AI-powered brand intelligence platform.',
      items: [
        'Architected a 23-category Brand Context Framework materializing competition, audience, and market into scoped prompts',
        'Built multi-platform ingestion pipeline with 10 async connectors crawling TikTok, Instagram, YouTube via Playwright',
        'Obtained 5 design partners based on demonstrated business fit as well as targeted marketing and pitch strategy design',
      ],
      tech: ['Python', 'Playwright', 'LLMs', 'Full-Stack'],
    },
  },
  {
    title: 'Zendesk',
    category: 'Professional Experience',
    color: '#03363d',
    details: {
      role: 'Contract Software Engineer',
      period: 'February 2026 – Present',
      location: 'San Francisco, CA',
      description: 'Engineering AI agent systems for enterprise customer support.',
      items: [
        'Built and evaluated AI agent architectures for customer support tasks, benchmarking against frontier open-weight LLMs',
        'Developed evaluation frameworks to measure agent reliability and efficiency in resolving tickets with LangGraph, CrewAI',
      ],
      tech: ['LangGraph', 'CrewAI', 'Python', 'LLMs'],
    },
  },
  {
    title: 'Breefly',
    category: 'Professional Experience',
    color: '#4a3728',
    details: {
      role: 'Co-Founder & Head of Product',
      period: 'August 2025 – February 2026',
      location: 'Berkeley, CA',
      description: 'Built an AI-powered video analysis platform. Raised $150K pre-seed at $3M valuation from Character Capital.',
      items: [
        'Developed a multi-stage LLM analysis with < 2 second transcript retrieval from long-form videos through indexing',
        'Reduced repeat-access latency ~95% by implementing Redis caching, Celery task orchestration, and WebSocket streams',
        'Designed analytics-driven iterations with user behavior metrics, capturing 1.5K+ total users and 5M+ impressions',
        'Raised $150K pre-seed investment ($3M valuation) from Character Capital by presenting user retention and market fit',
      ],
      tech: ['Redis', 'Celery', 'WebSockets', 'LLMs', 'Python'],
    },
  },
  {
    title: 'Astera Holdings',
    category: 'Professional Experience',
    color: '#3d3d3d',
    details: {
      role: 'Technical Operations and Analytics Intern',
      period: 'July 2025 – October 2025',
      location: 'New York, NY',
      description: 'Built data infrastructure and agentic AI workflows for operational analytics.',
      items: [
        'Improved operational efficiency ~60% by designing quantitative KPI dashboards tracking 7+ employee performance metrics',
        'Reduced reporting time ~75% by building agentic AI workflows automating market reports and operational processes',
        'Engineered automated data pipelines integrating operational metrics across departments using Python and SQL flows',
      ],
      tech: ['Python', 'SQL', 'Data Pipelines', 'AI Agents'],
    },
  },
  {
    title: 'Y-Next Capital',
    category: 'Professional Experience',
    color: '#1b3a4b',
    details: {
      role: 'Technology Strategy & Risk Analyst',
      period: 'November 2024 – September 2025',
      location: 'New York, NY',
      description: 'Quantitative risk analysis and portfolio strategy for a venture fund.',
      items: [
        'Built a quantitative risk framework integrating macroeconomic and sector performance data across a ~$170K portfolio',
        'Improved portfolio outcomes ~25% by reallocating exposure towards AI and robotics sectors using data-driven analysis',
      ],
      tech: ['Python', 'Data Analysis', 'Risk Modeling'],
    },
  },
  {
    title: 'MateoHacks',
    category: 'Professional Experience',
    color: '#2d4436',
    details: {
      role: 'Founder & Sponsorships Lead',
      period: 'October 2022 – May 2024',
      location: 'San Mateo, CA',
      description: 'Founded the first nationwide high school hackathon at San Mateo High School.',
      items: [
        'Enabled a 120+ participant event by building a website centralizing all registration, logistics, and participant data',
        'Raised $55K+ in sponsorship monetary value from 20+ companies by developing targeted outreach campaigns',
        'Designed a 30-member logistics team to facilitate the first in-person hackathon in San Mateo with 120+ active students',
      ],
    },
  },

  // --- Projects ---
  {
    title: 'TileMate',
    category: 'Project',
    color: '#5c4033',
    details: {
      period: 'February 2025',
      location: 'San Francisco, CA',
      description: 'An end-to-end hardware-software product for real-time pressure tracking.',
      items: [
        'Built an end-to-end hardware-software product to track real-time pressure data using ESP32 sensors and a Node.js backend',
        'Designed data ingestion and processing logic to capture analog voltage signals and livestream structured outputs',
        'Deployed a live web interface to visualize movement across tiles, voltage, and accumulated energy with real-time monitoring',
      ],
      tech: ['ESP32', 'Node.js', 'WebSockets', 'Hardware'],
    },
  },
  {
    title: 'Healthy Messages',
    category: 'Project',
    color: '#6b3a3a',
    details: {
      period: 'February 2024',
      location: 'San Mateo, CA',
      description: 'AI-driven content moderation to remove hate speech across social platforms.',
      items: [
        'Built an AI-driven content moderation application to remove hateful and oppressive content across social platforms',
        'Improved filtration accuracy from 45% to 90% by training a sentiment analysis model on 60K labeled data points',
        'Experimented with feature engineering and preprocessing techniques to improve generalization across content domains',
      ],
      tech: ['Python', 'Scikit-Learn', 'NLP', 'Pandas'],
    },
  },
  {
    title: 'Crisis Mapper',
    category: 'Project',
    color: '#3a4a6b',
    details: {
      period: 'September 2023',
      location: 'San Francisco, CA',
      description: 'Real-time incident alerting from social media sources.',
      items: [
        'Developed a real-time incident alerting product by aggregating and mapping emergency data from live social media sources',
        'Utilized Tkinter to plot incidents based on address on an interactive map from Facebook web-scraping',
      ],
      tech: ['Python', 'Tkinter', 'Web Scraping', 'OpenAI'],
    },
  },

  // --- Hobbies ---
  {
    title: 'Poker',
    category: 'Hobby',
    color: '#d4c5a0',
    details: {
      description: 'Favorite hand: A10 suited. Always chasing the perfect read.',
    },
  },
  {
    title: 'Acoustic Guitar',
    category: 'Hobby',
    color: '#8b7355',
    details: {
      description: 'Picking up new songs and unwinding through music.',
    },
  },
  {
    title: 'Distance Running',
    category: 'Hobby',
    color: '#6a8e7f',
    details: {
      description: '1:44 half marathon. Finding clarity on long runs.',
    },
  },
  {
    title: 'Basketball',
    category: 'Hobby',
    color: '#c4753b',
    details: {
      description: 'Pickup games and watching the Warriors.',
    },
  },
  {
    title: 'Soccer',
    category: 'Hobby',
    color: '#4a6c5c',
    details: {
      description: 'Lifelong player and fan of the beautiful game.',
    },
  },
  {
    title: 'Spanish',
    category: 'Hobby',
    color: '#8b4513',
    details: {
      description: 'Learning the language and exploring the culture.',
    },
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-5 flex items-center justify-between transition-all duration-300 bg-neutral-950/80 backdrop-blur-md border-b border-white/5">
        <a href="#" className="font-[--font-display] text-lg font-bold text-white no-underline">
          Sanjay Mukhyala
        </a>
        <div className="flex gap-6 md:gap-8">
          {['About', 'Experience', 'Projects', 'Hobbies'].map((s) => (
            <a
              key={s}
              href={`#${s.toLowerCase()}`}
              className="font-[--font-ui] text-xs uppercase tracking-[1.5px] text-white/50 hover:text-white transition-colors no-underline"
            >
              {s}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <header className="min-h-[85vh] flex items-center justify-center text-center pt-28 pb-20 px-6" id="about">
        <div className="max-w-2xl">
          <h1 className="font-[--font-display] text-5xl md:text-6xl font-black leading-tight mb-4 tracking-tight">
            Sanjay Mukhyala
          </h1>
          <p className="font-[--font-body] text-xl md:text-2xl font-light italic text-white/60 mb-1">
            Applied Mathematics & Data Science
          </p>
          <p className="font-[--font-ui] text-sm font-light uppercase tracking-[2px] text-white/30 mb-8">
            University of California, Berkeley
          </p>
          <p className="font-[--font-body] text-base text-white/50 leading-relaxed mb-8 max-w-lg mx-auto">
            I build products at the intersection of software, data, and strategy — from co-founding startups to engineering AI systems at scale.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            {[
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sanjaymukhyala' },
              { label: 'GitHub', href: 'https://github.com/smukhyala' },
              { label: 'Email', href: 'mailto:smukhyala@gmail.com' },
              { label: 'Resume', href: '/resume.pdf' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                className="font-[--font-ui] text-sm text-white/40 border-b border-white/10 pb-0.5 hover:text-white hover:border-white/50 transition-all no-underline"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Music marquee */}
      <MusicScroll />

      {/* Main content */}
      <main>
        {/* Experience */}
        <section className="px-6 py-24 md:py-32" id="experience">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[--font-ui] text-xs font-medium uppercase tracking-[3px] text-white/40 mb-4">
              Professional Experience
            </h2>
            <div className="w-10 h-px bg-white/10 mb-12" />
            <div className="flex flex-col gap-5">
              {experiences
                .filter((e) => e.category === 'Professional Experience')
                .map((experience, index) => (
                  <ExperienceBook key={experience.title} experience={experience} index={index} />
                ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="px-6 py-24 md:py-32 bg-white/[0.02]" id="projects">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[--font-ui] text-xs font-medium uppercase tracking-[3px] text-white/40 mb-4">
              Projects
            </h2>
            <div className="w-10 h-px bg-white/10 mb-12" />
            <div className="flex flex-col gap-5">
              {experiences
                .filter((e) => e.category === 'Project')
                .map((experience, index) => (
                  <ExperienceBook key={experience.title} experience={experience} index={index} />
                ))}
            </div>
          </div>
        </section>

        {/* Hobbies */}
        <section className="px-6 py-24 md:py-32" id="hobbies">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[--font-ui] text-xs font-medium uppercase tracking-[3px] text-white/40 mb-4">
              Hobbies
            </h2>
            <div className="w-10 h-px bg-white/10 mb-12" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {experiences
                .filter((e) => e.category === 'Hobby')
                .map((experience, index) => (
                  <ExperienceBook key={experience.title} experience={experience} index={index} />
                ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-10">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-[--font-ui] text-xs text-white/20">
            &copy; 2026 Sanjay Mukhyala
          </p>
          <div className="flex gap-6">
            {[
              { label: 'smukhyala@gmail.com', href: 'mailto:smukhyala@gmail.com' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sanjaymukhyala' },
              { label: 'GitHub', href: 'https://github.com/smukhyala' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                className="font-[--font-ui] text-xs text-white/30 hover:text-white/60 transition-colors no-underline"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
