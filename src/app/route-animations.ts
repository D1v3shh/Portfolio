import {
  trigger,
  transition,
  style,
  animate,
  query,
  group,
  animateChild,
} from '@angular/animations';

/**
 * Route Transition Animations
 * ───────────────────────────
 * - ENTER (incoming):  CRT power-on — clip-path rect reveals top→bottom
 * - LEAVE (outgoing):  Static noise — filter saturate/contrast burst + fade
 *
 * Total budget: ≤ 400ms
 */

export const routeTransitionAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    /* ── Ensure both pages are absolutely positioned during transition ── */
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }),
    ], { optional: true }),

    /* ── Set initial state for entering page ── */
    query(':enter', [
      style({
        clipPath: 'inset(0 0 100% 0)',   /* fully clipped — invisible */
        opacity: 0,
      }),
    ], { optional: true }),

    /* ── Run leave + enter in parallel ── */
    group([

      /* ── Outgoing: static noise burst via filter ── */
      query(':leave', [
        style({
          filter: 'saturate(1) contrast(1) brightness(1)',
          opacity: 1,
        }),
        animate('200ms cubic-bezier(0.4, 0, 1, 1)', style({
          filter: 'saturate(8) contrast(5) brightness(2.5)',
          opacity: 0,
        })),
      ], { optional: true }),

      /* ── Incoming: CRT clip-rect reveal top→bottom ── */
      query(':enter', [
        /* Small delay so the noise flash registers first */
        animate('380ms 20ms cubic-bezier(0.22, 1, 0.36, 1)', style({
          clipPath: 'inset(0 0 0% 0)',   /* fully revealed */
          opacity: 1,
        })),
      ], { optional: true }),

    ]),

    /* ── Kick child animations after transition settles ── */
    query(':enter', animateChild(), { optional: true }),
  ]),
]);
