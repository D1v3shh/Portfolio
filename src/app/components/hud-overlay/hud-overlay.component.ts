import {
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ResumeService } from '../../services/resume.service';
import { Basics, SocialProfile } from '../../models/resume.model';

/**
 * HudOverlayComponent
 * -------------------
 * Cyberpunk-themed HUD overlay absolutely positioned over the Three.js canvas.
 *
 * ### Four Corner Panels
 * - **Top-Left**: Name + title from ResumeService
 * - **Top-Right**: Navigation links (section anchors)
 * - **Bottom-Left**: Social links from `basics.profiles`
 * - **Bottom-Right**: SYSTEM STATUS with typing animation
 *
 * Uses CSS `clip-path` for angled/beveled corners on each panel.
 */
@Component({
  selector: 'app-hud-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hud-overlay.component.html',
  styleUrls: ['./hud-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HudOverlayComponent implements OnInit, OnDestroy {
  /* ── Resume data ────────────────────────────────────────────── */
  basics: Basics | null = null;
  profiles: SocialProfile[] = [];

  /* ── Navigation links ───────────────────────────────────────── */
  navLinks = [
    { label: 'ABOUT', target: '#about' },
    { label: 'SKILLS', target: '#skills' },
    { label: 'PROJECTS', target: '#projects' },
    { label: 'EXPERIENCE', target: '#experience' },
    { label: 'CONTACT', target: '#contact' },
  ];

  /* ── System status typing ───────────────────────────────────── */
  statusLines: string[] = [];
  private readonly fullStatusLines = [
    '> SYSTEM ONLINE',
    '> NEURAL LINK: ACTIVE',
    '> THREAT LEVEL: NONE',
    '> PORTFOLIO v1.0.0',
    '> STATUS: OPERATIONAL',
  ];
  private typingTimeoutIds: ReturnType<typeof setTimeout>[] = [];

  /* ── Internals ──────────────────────────────────────────────── */
  private sub!: Subscription;

  constructor(
    private resumeService: ResumeService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {}

  /* ── Lifecycle ──────────────────────────────────────────────── */

  ngOnInit(): void {
    this.sub = this.resumeService.getBasics().subscribe((basics) => {
      this.basics = basics;
      this.profiles = basics.profiles ?? [];
      this.cdr.markForCheck();
    });

    this.ngZone.runOutsideAngular(() => this.startTypingAnimation());
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.typingTimeoutIds.forEach((id) => clearTimeout(id));
  }

  /* ── Social icon helper ─────────────────────────────────────── */

  getSocialIcon(network: string): string {
    const icons: Record<string, string> = {
      GitHub: 'GH',
      LinkedIn: 'LI',
      Twitter: 'TW',
      Instagram: 'IG',
      Facebook: 'FB',
      YouTube: 'YT',
    };
    return icons[network] ?? network.substring(0, 2).toUpperCase();
  }

  /* ── Typing animation ───────────────────────────────────────── */

  private startTypingAnimation(): void {
    let lineIndex = 0;
    const typeNextLine = () => {
      if (lineIndex >= this.fullStatusLines.length) return;

      const fullLine = this.fullStatusLines[lineIndex];
      let charIndex = 0;

      // Push an empty string for the new line being typed
      this.ngZone.run(() => {
        this.statusLines.push('');
        this.cdr.markForCheck();
      });

      const currentLineIdx = lineIndex;

      const typeChar = () => {
        if (charIndex <= fullLine.length) {
          this.ngZone.run(() => {
            this.statusLines[currentLineIdx] = fullLine.substring(0, charIndex);
            this.cdr.markForCheck();
          });
          charIndex++;
          const id = setTimeout(typeChar, 30 + Math.random() * 50);
          this.typingTimeoutIds.push(id);
        } else {
          // Line complete, start next after a pause
          lineIndex++;
          const id = setTimeout(typeNextLine, 400 + Math.random() * 300);
          this.typingTimeoutIds.push(id);
        }
      };

      const id = setTimeout(typeChar, 200);
      this.typingTimeoutIds.push(id);
    };

    // Initial delay before typing starts
    const id = setTimeout(typeNextLine, 1000);
    this.typingTimeoutIds.push(id);
  }
}
