// Share helpers: Web Share API + canvas-generated share card (free, local).
// FUTURE: referral mechanic ("share with a friend to unlock a bonus card")
// can hook in here by appending a ?ref= code to the shared URL.
export async function shareText(title: string, text: string, url: string): Promise<'shared' | 'copied'> {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return 'shared';
    } catch { /* user cancelled — fall through to copy */ }
  }
  await navigator.clipboard.writeText(`${text} ${url}`);
  return 'copied';
}

/** Encode name+dob+focus into a URL-safe token — the whole "database" lives
    inside the link itself. No server, fully private. */
export function encodeShare(name: string, dob: string, focus: string): string {
  const json = JSON.stringify([name, dob, focus]);
  return btoa(unescape(encodeURIComponent(json))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeShare(token: string): { name: string; dob: string; focus: string } | null {
  try {
    const b64 = token.replace(/-/g, '+').replace(/_/g, '/');
    const [name, dob, focus] = JSON.parse(decodeURIComponent(escape(atob(b64))));
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return null;
    return { name: String(name).slice(0, 40), dob, focus: String(focus).slice(0, 20) };
  } catch { return null; }
}

/** Build and download an .ics calendar with the bright days of a month. */
export function downloadIcs(dates: Date[], summary: string, description: string) {
  const pad = (n: number) => String(n).padStart(2, '0');
  const events = dates.map((d) => {
    const ymd = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
    return `BEGIN:VEVENT\r\nUID:lumina-${ymd}@lumina\r\nDTSTART;VALUE=DATE:${ymd}\r\nSUMMARY:${summary}\r\nDESCRIPTION:${description}\r\nEND:VEVENT`;
  }).join('\r\n');
  const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Lumina//Bright days//EN\r\n${events}\r\nEND:VCALENDAR`;
  const a = document.createElement('a');
  a.download = 'lumina-bright-days.ics';
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

/** Draw a 1080×1350 Pearl-mist story card and download it as PNG. */
export function downloadShareCard(opts: { name: string; archetype: string; motto: string; title: string; url: string }) {
  const W = 1080, H = 1350;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const x = cv.getContext('2d')!;
  // pearl gradient background
  const grad = x.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, '#f3effc');
  grad.addColorStop(0.5, '#e9e0fa');
  grad.addColorStop(1, '#fbeee9');
  x.fillStyle = grad;
  x.fillRect(0, 0, W, H);
  // soft iridescent blobs
  const blob = (bx: number, by: number, r: number, stops: [number, string][]) => {
    const g = x.createRadialGradient(bx, by, r * 0.1, bx, by, r);
    stops.forEach(([o, c]) => g.addColorStop(o, c));
    x.fillStyle = g;
    x.beginPath();
    x.arc(bx, by, r, 0, Math.PI * 2);
    x.fill();
  };
  blob(180, 260, 340, [[0, 'rgba(255,214,236,0.85)'], [1, 'rgba(255,214,236,0)']]);
  blob(920, 420, 380, [[0, 'rgba(205,194,247,0.85)'], [1, 'rgba(205,194,247,0)']]);
  blob(540, 1150, 420, [[0, 'rgba(211,240,232,0.8)'], [1, 'rgba(211,240,232,0)']]);
  // glass ring dial
  const cx = W / 2, cy = 450;
  x.fillStyle = 'rgba(255,255,255,0.5)';
  x.beginPath(); x.arc(cx, cy, 235, 0, Math.PI * 2); x.fill();
  x.strokeStyle = 'rgba(255,255,255,0.95)';
  x.lineWidth = 3;
  x.beginPath(); x.arc(cx, cy, 235, 0, Math.PI * 2); x.stroke();
  x.strokeStyle = '#6b5bb5';
  x.lineWidth = 6;
  x.beginPath(); x.arc(cx, cy, 200, -Math.PI / 2, Math.PI * 0.9); x.stroke();
  x.strokeStyle = 'rgba(107,91,181,0.35)';
  x.lineWidth = 2;
  x.setLineDash([2, 12]);
  x.beginPath(); x.arc(cx, cy, 170, 0, Math.PI * 2); x.stroke();
  x.setLineDash([]);
  const wrap = (text: string, size: number, y: number, color: string, italic = false, max = 880) => {
    x.font = `${italic ? 'italic ' : ''}${size}px Georgia`;
    x.fillStyle = color;
    x.textAlign = 'center';
    const words = text.split(' ');
    let line = '', yy = y;
    for (const w of words) {
      if (x.measureText(line + w).width > max) { x.fillText(line.trim(), cx, yy); line = ''; yy += size * 1.25; }
      line += w + ' ';
    }
    x.fillText(line.trim(), cx, yy);
    return yy;
  };
  x.font = '30px Georgia'; x.fillStyle = '#8a7cc9'; x.textAlign = 'center';
  x.fillText('L U M I N A', cx, 130);
  wrap(opts.name, 52, cy - 30, '#4a3f8c');
  wrap(opts.archetype, 74, cy + 60, '#6b5bb5', true);
  wrap(`«${opts.motto}»`, 44, 880, '#4a3f8c', true, 820);
  x.font = '28px Georgia'; x.fillStyle = 'rgba(74,63,140,0.55)';
  x.fillText(opts.title, cx, 1190);
  x.fillText(opts.url, cx, 1235);
  const a = document.createElement('a');
  a.download = 'lumina-card.png';
  a.href = cv.toDataURL('image/png');
  a.click();
}
