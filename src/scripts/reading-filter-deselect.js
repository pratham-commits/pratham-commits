/** Click an active category filter again → reset to All. */
export function initReadingFilterDeselect(root = document.querySelector('.reading-shelf')) {
  if (!(root instanceof HTMLElement)) return;

  const allRadio = root.querySelector('#reading-filter-all');
  if (!(allRadio instanceof HTMLInputElement)) return;

  root.querySelectorAll('.reading-filters label.reading-filter[for]').forEach((label) => {
    label.addEventListener('click', (event) => {
      const forId = label.getAttribute('for');
      if (!forId || forId === 'reading-filter-all') return;

      const radio = root.querySelector(`#${CSS.escape(forId)}`);
      if (!(radio instanceof HTMLInputElement) || !radio.checked) return;

      event.preventDefault();
      allRadio.checked = true;
    });
  });
}
