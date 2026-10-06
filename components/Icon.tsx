import React from 'react';

type IconProps = {
  name: string;
  className?: string;
  size?: number;
};

const paths: Record<string, React.ReactNode> = {
  coffee: (
    <path d="M18 8h1a4 4 0 010 8h-1M5 8h13v9a4 4 0 01-4 4H9a4 4 0 01-4-4V8zM8 1v3M12 1v3M16 1v3" />
  ),
  heart: (
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
  ),
  leaf: (
    <path d="M11 20A7 7 0 019.8 6.1C15 6 19 10 19 15.5a8 8 0 01-8 4.5zM2 22c4-4 6-6 6-10M2 21c2-1 4-1 6 0" />
  ),
  star: (
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  ),
  cake: (
    <path d="M12 2a2 2 0 012 2c0 .74-.4 1.38-1 1.73V8h7a2 2 0 012 2v12H2V10a2 2 0 012-2h7V5.73A2 2 0 0110 4a2 2 0 012-2zM4 14v6h16v-6M4 18h6M12 18h8" />
  ),
  utensils: (
    <path d="M3 2v7c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V2M6 2v20M18 2c-1.5 0-3 1.5-3 3v6c0 1.1.9 2 2 2h1v9" />
  ),
  home: (
    <path d="M3 9.5l9-7 9 7V20a2 2 0 01-2 2H5a2 2 0 01-2-2V9.5zM9 22V12h6v10" />
  ),
  users: (
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  ),
  camera: (
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z" />
  ),
  calendar: (
    <path d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18" />
  ),
  snowflake: (
    <path d="M12 2v20M12 2l3 3M12 2l-3 3M12 22l3-3M12 22l-3 3M2 12h20M2 12l3-3M2 12l3 3M22 12l-3-3M22 12l-3 3M5 5l14 14M5 5l4 1M5 5l1 4M19 19l-4-1M19 19l-1-4M5 19l14-14M5 19l4-1M5 19l1-4M19 5l-4 1M19 5l-1 4" />
  ),
  sun: (
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M8 12a4 4 0 118 0 4 4 0 01-8 0z" />
  ),
  list: (
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
  ),
  play: (
    <path d="M5 3l14 9-14 9V3z" />
  ),
  pause: (
    <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
  ),
  share: (
    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
  ),
  chat: (
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
  ),
  volume: (
    <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
  ),
  volumeMute: (
    <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
  ),
  fullscreen: (
    <path d="M8 3H5a2 2 0 00-2 2v3M16 3h3a2 2 0 012 2v3M8 21H5a2 2 0 01-2-2v-3M16 21h3a2 2 0 002-2v-3" />
  ),
  more: (
    <path d="M12 13a1 1 0 100-2 1 1 0 000 2zM12 6a1 1 0 100-2 1 1 0 000 2zM12 20a1 1 0 100-2 1 1 0 000 2z" />
  ),
  arrowLeft: (
    <path d="M19 12H5M12 19l-7-7 7-7" />
  ),
  arrowRight: (
    <path d="M5 12h14M12 5l7 7-7 7" />
  ),
  menu: (
    <path d="M3 12h18M3 6h18M3 18h18" />
  ),
  close: (
    <path d="M18 6L6 18M6 6l12 12" />
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  ),
  mapPin: (
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
  ),
  clock: (
    <path d="M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2" />
  ),
  send: (
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
    </>
  ),
  telegram: (
    <path d="M21.5 4.5L2.5 11.5l5 2 2 6 3-4 5 4 4-14z" />
  ),
  whatsapp: (
    <path d="M3 21l1.65-3.8a9 9 0 113.4 2.9L3 21M9 10a.5.5 0 100 1 .5.5 0 000-1M14 10a.5.5 0 100 1 .5.5 0 000-1M9.5 9.5c0 2.5 3 5 5 5" />
  ),
  search: (
    <path d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35" />
  ),
  bookmark: (
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
  ),
  film: (
    <path d="M23 7l-7 5 7 5V7zM1 5h15v14H1a1 1 0 01-1-1V6a1 1 0 011-1z" />
  ),
  chevronLeft: (
    <path d="M15 18l-6-6 6-6" />
  ),
  chevronRight: (
    <path d="M9 18l6-6-6-6" />
  ),
  check: (
    <path d="M20 6L9 17l-5-5" />
  ),
  copy: (
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2M9 4h6v4H9z" />
  ),
  table: (
    <path d="M3 9h18M3 14h18M5 4v16M19 4v16" />
  ),
  sparkles: (
    <path d="M12 3l1.5 5L19 9.5 13.5 11 12 16l-1.5-5L5 9.5 10.5 8 12 3zM19 14l.75 2.5L22 17.5l-2.25.75L19 21l-.75-2.75L16 17.5l2.25-1z" />
  ),
};

export default function Icon({ name, className = '', size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] || null}
    </svg>
  );
}
