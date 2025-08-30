import React, { useEffect, useMemo, useRef, useState } from 'react';

type TimeClockProps = {
  value: string; // HH:MM (24h)
  onChange: (value: string) => void;
  size?: number; // pixel size of the clock (square)
};

function pad(n: number) {
  return n < 10 ? `0${n}` : String(n);
}

function parseValue(value: string) {
  const [hh, mm] = (value || '').split(':').map((v) => parseInt(v, 10));
  const hour = Number.isFinite(hh) ? Math.max(0, Math.min(23, hh)) : 0;
  const minute = Number.isFinite(mm) ? Math.max(0, Math.min(59, mm)) : 0;
  return { hour, minute };
}

export default function TimeClock({ value, onChange, size = 220 }: TimeClockProps) {
  const { hour, minute } = useMemo(() => parseValue(value), [value]);
  const [mode, setMode] = useState<'hour' | 'minute'>('hour');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dragging, setDragging] = useState(false);

  // make the clock smaller for the time modal
  const radius = (size / 2) * 0.9;
  const center = { x: size / 2, y: size / 2 };

  function angleFromPoint(clientX: number, clientY: number) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const dx = x - center.x;
    const dy = y - center.y;
    // angle from 12 o'clock, clockwise
    const theta = Math.atan2(dy, dx); // from +x axis
    let deg = (theta * 180) / Math.PI; // -180..180 from +x
    deg = deg + 90; // shift so 0 is at 12 o'clock
    if (deg < 0) deg += 360;
    return deg % 360;
  }

  function setByAngle(deg: number) {
    if (mode === 'hour') {
      const rawIdx = Math.round(deg / 30) % 12; // 12 slices
      const h12 = rawIdx === 0 ? 12 : rawIdx; // 1..12
      // map 12h wheel to 24h by snapping to nearest of current hour's half (0-11 vs 12-23) by comparing to current hour
      const currentHalf = hour >= 12 ? 12 : 0;
      let h24 = (h12 % 12) + currentHalf; // keep current half-day
      // wrap bounds
      if (h24 > 23) h24 = 23;
      onChange(`${pad(h24)}:${pad(minute)}`);
    } else {
      const m = Math.round(deg / 6) % 60; // 60 mins
      onChange(`${pad(hour)}:${pad(m)}`);
    }
  }

  function handlePointer(e: MouseEvent | TouchEvent) {
    let clientX = 0;
    let clientY = 0;
    if (e instanceof TouchEvent) {
      const t = e.touches[0] || e.changedTouches[0];
      if (!t) return;
      clientX = t.clientX;
      clientY = t.clientY;
    } else {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    }
    const deg = angleFromPoint(clientX, clientY);
    setByAngle(deg);
  }

//eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!dragging) return;
      e.preventDefault();
      handlePointer(e);
    }
    function onUp() {
      if (!dragging) return;
      setDragging(false);
      if (mode === 'hour') {
        // auto-switch to minute after setting hour
        setMode('minute');
      }
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [dragging, mode, handlePointer]);

  const hour12 = ((hour % 12) + 12) % 12 || 12;
  const hourAngle = (hour12 % 12) * 30; // 0..330
  const minuteAngle = (minute % 60) * 6; // 0..354
  const handAngle = mode === 'hour' ? hourAngle : minuteAngle;
  const handLen = mode === 'hour' ? radius * 0.5 : radius * 0.75;

  const handX = center.x + handLen * Math.sin((handAngle * Math.PI) / 180);
  const handY = center.y - handLen * Math.cos((handAngle * Math.PI) / 180);

  function onMouseDown(e: React.MouseEvent) {
    setDragging(true);
    const deg = angleFromPoint(e.clientX, e.clientY);
    setByAngle(deg);
  }

  function onClick(e: React.MouseEvent) {
    const deg = angleFromPoint(e.clientX, e.clientY);
    setByAngle(deg);
    if (mode === 'hour') setMode('minute');
  }

  return (
    <div ref={containerRef} style={{ display: 'grid', gap: 8, justifyItems: 'center' }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <button type="button" onClick={() => setMode('hour')} style={{ padding: '4px 8px', borderRadius: 6, border: mode === 'hour' ? '1px solid #2563eb' : '1px solid #e5e7eb', background: mode === 'hour' ? '#eff6ff' : 'white' }}>Hours</button>
        <button type="button" onClick={() => setMode('minute')} style={{ padding: '4px 8px', borderRadius: 6, border: mode === 'minute' ? '1px solid #2563eb' : '1px solid #e5e7eb', background: mode === 'minute' ? '#eff6ff' : 'white' }}>Minutes</button>
      </div>

      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        onMouseDown={onMouseDown}
        onClick={onClick}
        style={{ cursor: 'pointer', touchAction: 'none', userSelect: 'none', background: 'white', borderRadius: '50%', boxShadow: 'inset 0 0 0 1px #e5e7eb' }}
      >
        {/* outer circle */}
        <circle cx={center.x} cy={center.y} r={radius - 1} fill="#ffffff" stroke="#e5e7eb" />

        {/* hour ticks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const ang = (i * 30 * Math.PI) / 180;
          const inner = radius - 18;
          const outer = radius - 6;
          const x1 = center.x + inner * Math.sin(ang);
          const y1 = center.y - inner * Math.cos(ang);
          const x2 = center.x + outer * Math.sin(ang);
          const y2 = center.y - outer * Math.cos(ang);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9ca3af" strokeWidth={2} />;
        })}

        {/* minute ticks (every 5) */}
        {Array.from({ length: 60 }).map((_, i) => {
          if (i % 5 !== 0) return null;
          const ang = (i * 6 * Math.PI) / 180;
          const inner = radius - 12;
          const outer = radius - 6;
          const x1 = center.x + inner * Math.sin(ang);
          const y1 = center.y - inner * Math.cos(ang);
          const x2 = center.x + outer * Math.sin(ang);
          const y2 = center.y - outer * Math.cos(ang);
          return <line key={`m${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d1d5db" strokeWidth={1} />;
        })}

        {/* numbers */}
        {Array.from({ length: 12 }).map((_, i) => {
          const num = i === 0 ? 12 : i;
          const ang = (i * 30 * Math.PI) / 180;
          const r = radius - 34;
          const x = center.x + r * Math.sin(ang);
          const y = center.y - r * Math.cos(ang);
          return (
            <text
              key={`n${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              style={{ fontSize: 12, fill: '#374151' }}
            >
              {num}
            </text>
          );
        })}

        {/* hand */}
        <line x1={center.x} y1={center.y} x2={handX} y2={handY} stroke="#2563eb" strokeWidth={3} strokeLinecap="round" />
        <circle cx={center.x} cy={center.y} r={4} fill="#2563eb" />
      </svg>

      <div style={{ textAlign: 'center', fontVariantNumeric: 'tabular-nums', color: '#111827' }}>
        {pad(hour)}:{pad(minute)}
      </div>
    </div>
  );
}
