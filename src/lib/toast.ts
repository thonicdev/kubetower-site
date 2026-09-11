/**
 * The single toast at the bottom-right corner.
 *
 * One element in the layout, addressed by id, rather than one per caller —
 * two toasts stacking on the same corner is the failure this avoids.
 */
let hideTimer: ReturnType<typeof setTimeout> | undefined;

export function showToast(message: string): void {
  const toast = document.getElementById('toast');
  const label = document.getElementById('toast-message');
  if (!toast || !label) return;

  label.textContent = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 2600);
}
