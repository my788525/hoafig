'use client';

import React, { useState } from 'react';

export interface IcsDeadlineButtonProps {
  title: string;
  description: string;
  daysFromNow?: number;
  targetDate?: string | Date;
  url?: string;
  label?: string;
  className?: string;
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,');
}

function formatIcsDateOnly(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}

function formatIcsUtcTimestamp(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  const hh = String(date.getUTCHours()).padStart(2, '0');
  const mm = String(date.getUTCMinutes()).padStart(2, '0');
  const ss = String(date.getUTCSeconds()).padStart(2, '0');
  return `${y}${m}${d}T${hh}${mm}${ss}Z`;
}

export default function IcsDeadlineButton({
  title,
  description,
  daysFromNow = 14,
  targetDate,
  url = 'https://hoafig.com',
  label = 'Add Statutory Deadline (.ics)',
  className,
}: IcsDeadlineButtonProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const now = new Date();
    let eventDate: Date;

    if (targetDate) {
      const parsed = targetDate instanceof Date ? new Date(targetDate.getTime()) : new Date(targetDate);
      eventDate = Number.isNaN(parsed.getTime())
        ? new Date(now.getTime() + Math.max(1, daysFromNow) * 86400000)
        : parsed;
    } else {
      eventDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + Math.max(1, Math.round(daysFromNow)));
    }

    const endDate = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate() + 1);
    const dtStart = formatIcsDateOnly(eventDate);
    const dtEnd = formatIcsDateOnly(endDate);
    const dtStamp = formatIcsUtcTimestamp(now);
    const uid = `hoafig-${dtStart}-${Math.random().toString(36).slice(2, 10)}@hoafig.com`;

    const fullDescription = url ? `${description}\n\nReference: ${url}` : description;

    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//HOAFig//Statutory Deadline Exporter//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${dtStamp}`,
      `DTSTART;VALUE=DATE:${dtStart}`,
      `DTEND;VALUE=DATE:${dtEnd}`,
      `SUMMARY:${escapeIcsText(title)}`,
      `DESCRIPTION:${escapeIcsText(fullDescription)}`,
      `URL:${url}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      `DESCRIPTION:${escapeIcsText(`Upcoming HOA Statutory Deadline: ${title}`)}`,
      'TRIGGER:-P2D',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ];

    const icsContent = lines.join('\r\n') + '\r\n';
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);

    const safeSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 48);

    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = `${safeSlug || 'hoa-statutory-deadline'}.ics`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(blobUrl);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className={
        className ||
        'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#c8a24a] hover:bg-[#e2c275] text-[#091a32] text-xs font-extrabold transition cursor-pointer shadow-sm'
      }
    >
      <span>{downloaded ? 'Deadline .ics Downloaded ✓' : label}</span>
    </button>
  );
}
