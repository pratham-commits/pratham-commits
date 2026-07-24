/** Shortest-column masonry: DOM order, variable tile heights, no row gaps. */
export function initReadingMasonry(root = document.querySelector('.reading-shelf')) {
  if (!(root instanceof HTMLElement)) return () => {};

  const wall = root.querySelector('.reading-wall');
  const list = wall?.querySelector('.reading-masonry');
  if (!(wall instanceof HTMLElement) || !(list instanceof HTMLElement)) return () => {};

  let frame = 0;

  const parseGap = (styles) => {
    const raw = styles.gap || styles.columnGap || '0';
    const px = parseFloat(raw);
    return Number.isFinite(px) ? px : 0;
  };

  const columnCount = () => {
    const raw = getComputedStyle(wall).getPropertyValue('--reading-columns').trim();
    const count = Number.parseInt(raw, 10);
    return Number.isFinite(count) && count > 0 ? count : 1;
  };

  const isVisible = (item) => {
    const tile = item.querySelector('.reading-tile');
    if (!(tile instanceof HTMLElement)) return false;
    return getComputedStyle(tile).display !== 'none';
  };

  const layout = () => {
    frame = 0;

    const cols = columnCount();
    const styles = getComputedStyle(list);
    const gap = parseGap(styles);
    const width = list.clientWidth;

    if (width <= 0) return;

    const colWidth = (width - gap * (cols - 1)) / cols;
    const items = [...list.querySelectorAll(':scope > li')];
    const visible = items.filter(isVisible);

    list.classList.add('is-layout-ready');

    items.forEach((item) => {
      item.style.transform = '';
      item.style.width = '';
      if (!visible.includes(item)) return;
      item.style.width = `${colWidth}px`;
    });

    const heights = new Array(cols).fill(0);

    visible.forEach((item) => {
      item.style.transform = 'translate(-100vw, 0)';
      const itemHeight = item.offsetHeight;

      let col = 0;
      for (let i = 1; i < cols; i += 1) {
        if (heights[i] < heights[col]) col = i;
      }

      const x = col * (colWidth + gap);
      const y = heights[col];
      item.style.transform = `translate(${x}px, ${y}px)`;
      heights[col] += itemHeight + gap;
    });

    const maxHeight = heights.length ? Math.max(...heights) : 0;
    list.style.height = maxHeight > 0 ? `${maxHeight - gap}px` : '0px';
  };

  const schedule = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(layout);
  };

  if (typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(schedule);
    observer.observe(list);
    observer.observe(wall);
  } else {
    window.addEventListener('resize', schedule);
  }

  root.querySelectorAll('.reading-filter-input').forEach((input) => {
    input.addEventListener('change', schedule);
  });

  root.querySelectorAll('.reading-filters label.reading-filter').forEach((label) => {
    label.addEventListener('click', () => {
      schedule();
      window.setTimeout(schedule, 0);
    });
  });

  if (document.fonts?.ready) {
    document.fonts.ready.then(schedule);
  }

  schedule();
  window.addEventListener('load', schedule, { once: true });

  return schedule;
}
