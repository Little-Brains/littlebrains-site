// Jigsaw cut lines for the website (the lid art and the "pick any number" slider).
// Same idea as the app: exactly N pieces, rows whose lengths differ by at most one,
// longer rows grouped together, and every cut is a shoulder–neck–knob Bézier.
// This is a lightweight stand-in for drawing only. To show the app's real cuts,
// swap `cutPath` for the tools/reference generator from the app repo.

export type Rng = () => number;

/** Seeded Park–Miller generator, so a given seed always gives the same cut. */
export function seeded(seed: number): Rng {
  let s = Math.abs(Math.floor(seed)) % 2147483647 || 1;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const f = (n: number) => n.toFixed(1);

/**
 * One jigsaw edge from (x0,y0) to (x1,y1), as cubic Bézier segments
 * (no leading M). `flip` (+1 or -1) picks the side the knob sits on.
 */
export function tab(
  x0: number, y0: number, x1: number, y1: number,
  flip: number, rng: Rng, t = 0.1, jit = 0.025,
): string {
  const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy);
  const ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
  const j = () => (rng() * 2 - 1) * jit;
  const a = j(), b = j(), c = j(), d = j(), e = j();
  const P = (l: number, w: number) =>
    f(x0 + ux * l * L + nx * w * L * flip) + ',' + f(y0 + uy * l * L + ny * w * L * flip);
  return (
    ' C' + P(0.2, a) + ' ' + P(0.5 + b + d, -t + c) + ' ' + P(0.5 - t + b, t + c) +
    ' C' + P(0.5 - 2 * t + b - d, 3 * t + c) + ' ' + P(0.5 + 2 * t + b - d, 3 * t + c) + ' ' + P(0.5 + t + b, t + c) +
    ' C' + P(0.5 + b + d, -t + c) + ' ' + P(0.8, e) + ' ' + P(1, 0)
  );
}

/** Row lengths for exactly n pieces on a w×h picture, longest rows first. */
export function layout(n: number, w: number, h: number): number[] {
  let best: number[] = [n];
  let bestScore = Infinity;
  for (let r = 1; r <= n; r++) {
    const base = Math.floor(n / r), extra = n % r;
    if (base < 1) break;
    const rows = Array.from({ length: r }, (_, i) => base + (i < extra ? 1 : 0));
    const ph = h / r;
    // Worst piece shape in the layout: 0 means perfectly square.
    const score = Math.max(...rows.map((len) => Math.abs(Math.log(w / len / ph))));
    if (score < bestScore - 1e-9) { bestScore = score; best = rows; }
  }
  return best;
}

/** SVG path data for all the internal cuts of an n-piece puzzle. */
export function cutPath(n: number, w: number, h: number, seed: number): string {
  const rng = seeded(seed * 7919 + n);
  const flip = () => (rng() > 0.5 ? 1 : -1);
  const rows = layout(n, w, h);
  const ph = h / rows.length;
  let d = '';

  // Cuts inside each row.
  rows.forEach((len, r) => {
    const pw = w / len, y0 = r * ph;
    for (let k = 1; k < len; k++) {
      const x = k * pw;
      d += 'M' + f(x) + ',' + f(y0) + tab(x, y0, x, y0 + ph, flip(), rng);
    }
  });

  // Seams between rows. Where rows have different lengths the cuts meet the
  // seam at different points, so the seam is split at every meeting point.
  for (let r = 1; r < rows.length; r++) {
    const y = r * ph;
    const xs = new Set<number>([0, w]);
    for (const len of [rows[r - 1], rows[r]]) for (let k = 1; k < len; k++) xs.add(+(k * (w / len)).toFixed(3));
    const pts = [...xs].sort((a, b) => a - b);
    d += 'M0,' + f(y);
    for (let i = 0; i < pts.length - 1; i++) {
      const x0 = pts[i], x1 = pts[i + 1];
      d += x1 - x0 > ph * 0.45 ? tab(x0, y, x1, y, flip(), rng) : ' L' + f(x1) + ',' + f(y);
    }
  }
  return d;
}

/** A long interlocking edge for section dividers: tabs along the top, filled below. */
export function edgePath(width: number, height: number, segs: number, top = 26, seed = 3): string {
  const rng = seeded(seed);
  let d = 'M0,' + top;
  for (let i = 0; i < segs; i++) {
    d += tab((i * width) / segs, top, ((i + 1) * width) / segs, top, i % 2 ? 1 : -1, rng, 0.085, 0.01);
  }
  return d + ' L' + width + ',' + height + ' L0,' + height + ' Z';
}

/** Outline of a single jigsaw piece (used for the 404 hole and the favicon). */
export function piecePath(s: number, flips: [number, number, number, number], seed = 1): string {
  const rng = seeded(seed);
  return (
    'M0,0' + tab(0, 0, s, 0, flips[0], rng, 0.1, 0) + tab(s, 0, s, s, flips[1], rng, 0.1, 0) +
    tab(s, s, 0, s, flips[2], rng, 0.1, 0) + tab(0, s, 0, 0, flips[3], rng, 0.1, 0) + ' Z'
  );
}
