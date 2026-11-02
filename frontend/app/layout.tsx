import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DevHuddle (Kinetic Arena) — Collaborative Production Incident Cockpit',
  description: 'Collaborative, browser-based workspace for debugging production incidents as a team with Yjs CRDTs, Monaco Editor, Sandpack runtime, and live HTTP API profiling.',
  keywords: ['DevHuddle', 'Kinetic Arena', 'Yjs', 'CRDT', 'Monaco Editor', 'Sandpack', 'Incident Response', 'Collaborative Debugging'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-foreground antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
        {children}
      </body>
    </html>
  );
}
