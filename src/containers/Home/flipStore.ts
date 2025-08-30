const prevRects = new Map<string, DOMRect>();

export function capturePositions() {
  prevRects.clear();
  try {
    const els = document.querySelectorAll('.card-wrapper[data-task-id]');
    els.forEach((el) => {
      const id = el.getAttribute('data-task-id');
      if (!id) return;
      try {
        const r = el.getBoundingClientRect();
        prevRects.set(id, r);
      } catch (e) {
        // ignore
      }
    });
  } catch (e) {
    // ignore
  }
}

export function consumePrevRects(): Map<string, DOMRect> {
  const copy = new Map(prevRects);
  prevRects.clear();
  return copy;
}
