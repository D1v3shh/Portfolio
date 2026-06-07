import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
import { Subscription } from 'rxjs';
import { ResumeService } from '../../services/resume.service';
import { WorkEntry } from '../../models/resume.model';

/**
 * ExperienceComponent
 * -------------------
 * Standalone component that renders work experience as a vertical
 * glitch-styled timeline with cyberpunk aesthetics.
 *
 * ### Features
 * - Reads `work[]` from `ResumeService`
 * - Vertical timeline with neon accent line and glitch-styled markers
 * - CSS glitch hover animation with cyan/magenta shadow offset
 * - Cards slide in from left with staggered Angular animation delays by index
 * - Company, role, date range, summary, and highlights
 */
@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('timelineStagger', [
      transition(':enter', [
        query('.exp-timeline-item', [
          style({ opacity: 0, transform: 'translateX(-60px)' }),
          stagger(150, [
            animate(
              '0.6s cubic-bezier(0.22, 1, 0.36, 1)',
              style({ opacity: 1, transform: 'translateX(0)' })
            ),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ],
})
export class ExperienceComponent implements OnInit, OnDestroy {
  /* ── Data ────────────────────────────────────────────────────── */
  work: WorkEntry[] = [];

  /* ── Internals ──────────────────────────────────────────────── */
  private sub!: Subscription;

  constructor(
    private resumeService: ResumeService,
    private cdr: ChangeDetectorRef,
  ) {}

  /* ── Lifecycle ──────────────────────────────────────────────── */

  ngOnInit(): void {
    this.sub = this.resumeService.getWork().subscribe((work) => {
      this.work = work;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  /* ── Helpers ────────────────────────────────────────────────── */

  /** Format YYYY-MM to a readable string, handling "Present" for missing end dates. */
  formatDate(dateStr?: string): string {
    if (!dateStr) return 'Present';
    const [year, month] = dateStr.split('-');
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    return month ? `${months[+month - 1]} ${year}` : year;
  }
}
