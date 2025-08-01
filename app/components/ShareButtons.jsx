'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { buildShareUrl, copyToClipboard, buildCanonicalUrl } from '../lib/share';

/**
 * Reusable social share component.
 * - Uses Web Share API when available.
 * - Always renders fallback buttons: WhatsApp, Facebook, X, Telegram, LinkedIn, Copy Link.
 *
 * Props:
 *  - path?: string   // app-relative path (e.g. `/breeds/${slug}`) to build absolute URL
 *  - url?: string    // absolute URL override
 *  - title?: string
 *  - text?: string
 *  - variant?: 'inline' | 'compact' // default 'inline'
 *  - className?: string
 *
 * Accessibility: each control has an aria-label and focus-visible ring
 * Styling: TailwindCSS utility classes consistent with existing project
 */

export default function ShareButtons({
  path,
  url,
  title,
  text,
  variant = 'inline',
  className = '',
}) {
  const [shareSupported, setShareSupported] = useState(false);
  const [resolvedUrl, setResolvedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Resolve final URL on client
  useEffect(() => {
    setShareSupported(typeof navigator !== 'undefined' && !!navigator.share);
    if (url) {
      setResolvedUrl(url);
    } else if (path) {
      setResolvedUrl(buildCanonicalUrl(path));
    } else if (typeof window !== 'undefined' && window.location) {
      setResolvedUrl(window.location.href);
    } else {
      setResolvedUrl('');
    }
  }, [path, url]);

  const platforms = useMemo(
    () => [
      { key: 'whatsapp', label: 'WhatsApp', aria: 'Share on WhatsApp' },
      { key: 'facebook', label: 'Facebook', aria: 'Share on Facebook' },
      { key: 'x', label: 'X', aria: 'Share on X (Twitter)' },
      { key: 'telegram', label: 'Telegram', aria: 'Share on Telegram' },
      { key: 'linkedin', label: 'LinkedIn', aria: 'Share on LinkedIn' },
    ],
    []
  );

  const handleNativeShare = async () => {
    if (!shareSupported) return;
    try {
      await navigator.share({
        title: title || 'Share',
        text: text || '',
        url: resolvedUrl || '',
      });
    } catch {
      // silently ignore cancel/errors
    }
  };

  const handleCopy = async (e) => {
    if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
    if (!resolvedUrl) return;
    const ok = await copyToClipboard(resolvedUrl);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const BaseBtn =
    variant === 'compact'
      ? 'inline-flex items-center justify-center p-2 rounded-md border border-gray-200 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition text-gray-700'
      : 'inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition text-gray-700 text-sm';

  const IconSize = variant === 'compact' ? 18 : 16;

  const Icon = ({ name }) => {
    const size = IconSize;
    switch (name) {
      case 'whatsapp':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.52 3.48A11.9 11.9 0 0 0 12.06 0C5.62 0 .4 5.22.4 11.66c0 2.05.54 4.03 1.58 5.78L0 24l6.75-1.96a11.6 11.6 0 0 0 5.32 1.35h.01c6.44 0 11.66-5.22 11.66-11.66 0-3.12-1.22-6.05-3.22-8.25zM12.08 21.3h-.01a9.65 9.65 0 0 1-4.91-1.34l-.35-.2-4 .12 1.14-3.9-.23-.39a9.7 9.7 0 0 1-1.45-5.02c0-5.36 4.36-9.72 9.73-9.72 2.6 0 5.05 1.01 6.89 2.84a9.66 9.66 0 0 1 2.84 6.89c0 5.37-4.36 9.72-9.65 9.72zm5.6-7.24c-.31-.16-1.84-.9-2.13-1-.29-.1-.5-.16-.71.16-.21.31-.82 1-.99 1.2-.18.21-.37.23-.68.08-.31-.16-1.3-.48-2.47-1.53a9.2 9.2 0 0 1-1.7-2.1c-.18-.31 0-.48.14-.64.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.02-.55-.08-.16-.71-1.7-.97-2.33-.26-.63-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.6s1.13 3.02 1.29 3.23c.16.21 2.23 3.4 5.4 4.77.76.33 1.35.52 1.81.66.76.24 1.45.21 2 .13.61-.09 1.84-.75 2.1-1.48.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.6-.37z" />
          </svg>
        );
      case 'facebook':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M22.675 0h-21.35C.595 0 0 .593 0 1.326v21.348C0 23.406.595 24 1.325 24h11.482V14.706h-3.13v-3.62h3.13V8.413c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.463.099 2.796.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.312h3.588l-.467 3.62h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.675 0z" />
          </svg>
        );
      case 'x':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2H21.5l-7.63 8.72L23.5 22h-7.02l-5.49-6.4L4.7 22H1.44l8.17-9.32L.5 2h7.2l5 5.84L18.24 2zm-1.23 18h1.9L7.06 4h-1.9l11.843 16z" />
          </svg>
        );
      case 'telegram':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M9.034 15.32l-.375 5.279c.535 0 .766-.23 1.043-.505l2.5-2.404 5.176 3.79c.948.523 1.62.248 1.879-.877l3.405-15.949h.001c.302-1.409-.51-1.961-1.43-1.616L1.12 9.228c-1.37.532-1.349 1.298-.233 1.644l5.214 1.627 12.105-7.63c.567-.373 1.086-.167.66.206L9.034 15.32z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19 0h-14C2.239 0 1 1.239 1 3v18c0 1.761 1.239 3 3 3h14c1.761 0 3-1.239 3-3V3c0-1.761-1.239-3-3-3zM8.339 18.667H5.664V9.333h2.675v9.334zM7.001 8.151a1.547 1.547 0 1 1 0-3.095 1.547 1.547 0 0 1 0 3.095zM18.667 18.667h-2.672v-4.764c0-1.137-.021-2.598-1.584-2.598-1.585 0-1.828 1.236-1.828 2.514v4.848H9.911V9.333h2.565v1.269h.036c.357-.675 1.228-1.386 2.527-1.386 2.704 0 3.202 1.78 3.202 4.093v5.358z" />
          </svg>
        );
      case 'link':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3.9 12a5 5 0 0 1 5-5h3v2h-3a3 3 0 1 0 0 6h3v2h-3a5 5 0 0 1-5-5zm7-1h2v2h-2v-2zm4.2-4h-3v2h3a3 3 0 1 1 0 6h-3v2h3a5 5 0 0 0 0-10z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const labelVisible = variant !== 'compact';

  return (
    <div className={`flex items-center gap-2 ${className}`} role="group" aria-label="Share">
      {shareSupported && (
        <button
          type="button"
          onClick={handleNativeShare}
          className={`${BaseBtn} bg-white`}
          aria-label="Share via native share"
          title="Share"
        >
          <svg width={IconSize} height={IconSize} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18 8a3 3 0 0 0-2.816 1.983L9.91 8.635a3.002 3.002 0 0 0-5.82.865 3 3 0 0 0 5.82.865l5.274 1.348A3 3 0 1 0 18 8z" />
          </svg>
          {labelVisible && <span>Share</span>}
        </button>
      )}

      {platforms.map((p) => {
        const href = buildShareUrl(p.key, resolvedUrl, title, text);
        return (
          <a
            key={p.key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={p.aria}
            className={`${BaseBtn} bg-white`}
            title={p.label}
            onClick={(e) => {
              // If wrapped in a clickable card, prevent card navigation when clicking share
              e.stopPropagation?.();
            }}
          >
            <Icon name={p.key} />
            {labelVisible && <span>{p.label}</span>}
          </a>
        );
      })}

      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
        className={`${BaseBtn} bg-white`}
        title="Copy link"
      >
        <Icon name="link" />
        {labelVisible && <span>{copied ? 'Copied!' : 'Copy'}</span>}
        {!labelVisible && copied && (
          <span className="sr-only">Copied!</span>
        )}
      </button>
    </div>
  );
}

// Named export for convenience
export { default as ShareButtons };

/**
 * TODO:
 * - Consider extracting icons to a dedicated file if reuse expands.
 * - Allow customizing platform order/visibility via props if needed.
 * - Add tests for URL building and clipboard behavior (JSDOM).
 */
