/** Gentle haptic feedback on supported mobile browsers. */
export function haptic(pattern: number | number[] = 12) {
  try {
    if ('vibrate' in navigator) navigator.vibrate(pattern);
  } catch { /* unsupported — ignore */ }
}
