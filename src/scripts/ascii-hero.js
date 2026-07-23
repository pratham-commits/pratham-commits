/**
 * ASCII hero engine (vanilla JS, no dependencies).
 *
 * Renders a quiet field of terminal-like dust into a <pre>. Cells shimmer
 * independently, avoiding the large wave blobs that compete with content.
 *
 * Tunables: RAMP, DUST_MIN, DUST_MAX, SHIMMER_SPEED, SPOTLIGHT_RADIUS.
 */

// A restrained ramp prevents visually heavy %, # and @ clusters.
const RAMP = ' .:-+';
const DUST_MIN = 0.12;
const DUST_MAX = 0.95;
const SHIMMER_SPEED = 0.00055;
/** Soft cursor spotlight: wide, smooth edge; lift applies only where spot > 0 */
const SPOTLIGHT_RADIUS = 200;
const SPOT_LIFT = 0.4;
const SPOT_SMOOTH = 0.14;
const FRAME_INTERVAL = 1000 / 24;

/** Smoothstep falloff: 0 at edge, 1 at center */
function spotlightStrength(dist, radius) {
  if (dist >= radius) return 0;
  const t = 1 - dist / radius;
  return t * t * (3 - 2 * t);
}

export function initAsciiHero(pre) {
  if (!pre) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let cols = 0;
  let rows = 0;
  let cellW = 8;
  let cellH = 13;
  // Pointer position relative to the <pre>, in px. Off-screen until first move.
  let px = -1e5;
  let py = -1e5;
  let sx = -1e5;
  let sy = -1e5;
  let rafId = 0;
  let lastFrame = -Infinity;

  // Stable pseudo-random value for each cell, in [0, 1).
  function noise(x, y) {
    const value = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return value - Math.floor(value);
  }

  function measureCell() {
    const probe = document.createElement('span');
    probe.textContent = 'M'.repeat(10);
    probe.style.cssText =
      'position:absolute;visibility:hidden;white-space:pre;font:inherit;line-height:inherit;';
    pre.appendChild(probe);
    const rect = probe.getBoundingClientRect();
    cellW = rect.width / 10 || 8;
    cellH = rect.height || 13;
    probe.remove();
  }

  function resize() {
    measureCell();
    const rect = pre.getBoundingClientRect();
    cols = Math.max(4, Math.floor(rect.width / cellW));
    rows = Math.max(2, Math.floor(rect.height / cellH));
  }

  function frame(t) {
    const maxIdx = RAMP.length - 1;
    const lines = new Array(rows);

    if (px < -1e4) {
      sx = px;
      sy = py;
    } else {
      sx += (px - sx) * SPOT_SMOOTH;
      sy += (py - sy) * SPOT_SMOOTH;
    }

    for (let y = 0; y < rows; y++) {
      let line = '';
      const cy = (y + 0.5) * cellH;
      for (let x = 0; x < cols; x++) {
        const seed = noise(x, y);
        const shimmer =
          (Math.sin(t * SHIMMER_SPEED + seed * Math.PI * 2) + 1) * 0.5;

        const base = DUST_MIN + shimmer * (DUST_MAX - DUST_MIN);

        const cx = (x + 0.5) * cellW;
        const dx = cx - sx;
        const dy = cy - sy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const spot = spotlightStrength(dist, SPOTLIGHT_RADIUS);

        let value = base;
        if (spot > 0) {
          value = Math.min(1, base + spot * SPOT_LIFT);
        }

        const span = (value - DUST_MIN) / (1 - DUST_MIN);
        const idx = Math.max(
          1,
          Math.min(maxIdx, 1 + Math.floor(span * (maxIdx - 1) + 0.001))
        );

        line += RAMP[idx];
      }
      lines[y] = line;
    }

    pre.textContent = lines.join('\n');
  }

  function loop(t) {
    if (t - lastFrame >= FRAME_INTERVAL) {
      frame(t);
      lastFrame = t;
    }
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    stop();
    if (reducedMotion.matches) {
      // Static frame: wave at t=0, no pointer follow.
      px = -1e5;
      py = -1e5;
      frame(0);
    } else {
      rafId = requestAnimationFrame(loop);
    }
  }

  function stop() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  // Pointer tracking on the window: the field is a fixed background layer
  // behind the content, so it never receives pointer events itself.
  window.addEventListener('pointermove', (e) => {
    const rect = pre.getBoundingClientRect();
    px = e.clientX - rect.left;
    py = e.clientY - rect.top;
  });
  window.addEventListener('pointerout', (e) => {
    if (!e.relatedTarget) {
      px = -1e5;
      py = -1e5;
    }
  });

  // Resize handling, debounced
  let resizeTimer = 0;
  const ro = new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      if (reducedMotion.matches) frame(0);
    }, 100);
  });
  ro.observe(pre);

  reducedMotion.addEventListener('change', start);

  resize();
  start();
}
