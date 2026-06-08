import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import * as THREE from 'three';
import { ResumeService } from '../../services/resume.service';
import {
  Basics,
  SkillGroup,
  ProjectEntry,
  WorkEntry,
  EducationEntry,
  CertificateEntry,
  SocialProfile,
} from '../../models/resume.model';
import { ThreeSceneComponent, ThreeSceneReadyEvent } from '../three-scene';
import { HudOverlayComponent } from '../hud-overlay';
import { ExperienceComponent } from '../experience';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ThreeSceneComponent, HudOverlayComponent, ExperienceComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  /* ── Resume data ──────────────────────────────────────────────── */
  basics: Basics | null = null;
  skills: SkillGroup[] = [];
  projects: ProjectEntry[] = [];
  featuredProjects: ProjectEntry[] = [];
  work: WorkEntry[] = [];
  education: EducationEntry[] = [];
  certificates: CertificateEntry[] = [];
  profiles: SocialProfile[] = [];

  /* ── Responsive state ─────────────────────────────────────────── */
  isMobile = false;
  private breakpointSub!: Subscription;

  /* ── Three.js particles ───────────────────────────────────────── */
  private particles!: THREE.Points;
  private animationId = 0;
  private startTime = 0;
  private orbitRunning = false;

  constructor(
    private resumeService: ResumeService,
    private ngZone: NgZone,
    private breakpointObserver: BreakpointObserver,
  ) {}

  /* ── Lifecycle ────────────────────────────────────────────────── */

  ngOnInit(): void {
    this.resumeService.getResume().subscribe((resume) => {
      this.basics = resume.basics;
      this.skills = resume.skills ?? [];
      this.projects = resume.projects ?? [];
      this.featuredProjects = this.projects.filter((p) => p['x-featured']);
      this.work = resume.work ?? [];
      this.education = resume.education ?? [];
      this.certificates = resume.certificates ?? [];
      this.profiles = resume.basics.profiles ?? [];
    });

    /* ── BreakpointObserver: detect mobile (< 768px) ────────────── */
    this.breakpointSub = this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .subscribe((result) => {
        this.isMobile = result.matches;

        if (this.isMobile) {
          this.stopOrbitAnimation();
        } else if (this.particles && !this.orbitRunning) {
          this.ngZone.runOutsideAngular(() => this.animateParticles());
        }
      });
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.breakpointSub?.unsubscribe();
  }

  /* ── Three.js scene hook ──────────────────────────────────────── */

  onSceneReady({ scene }: ThreeSceneReadyEvent): void {
    const magentaLight = new THREE.PointLight(0xff00aa, 0.9, 100);
    magentaLight.position.set(-5, -3, 3);
    scene.add(magentaLight);

    this.createParticles(scene);
    this.startTime = performance.now();

    /* Only start orbit loop on desktop */
    if (!this.isMobile) {
      this.ngZone.runOutsideAngular(() => this.animateParticles());
    }
  }

  /* ── Helpers ──────────────────────────────────────────────────── */

  /** Format YYYY-MM to a readable string, handling "Present" for missing end dates. */
  formatDate(dateStr?: string): string {
    if (!dateStr) return 'Present';
    const [year, month] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return month ? `${months[+month - 1]} ${year}` : year;
  }

  /* ── Particles ────────────────────────────────────────────────── */

  private createParticles(scene: THREE.Scene): void {
    /* Fewer particles on mobile for GPU performance */
    const particleCount = this.isMobile ? 800 : 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0x00f5ff),
      new THREE.Color(0xff00aa),
      new THREE.Color(0xbf00ff),
      new THREE.Color(0x00f5ff),
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.particles = new THREE.Points(geometry, material);
    scene.add(this.particles);
  }

  private animateParticles = (): void => {
    this.orbitRunning = true;
    this.animationId = requestAnimationFrame(this.animateParticles);
    const elapsed = (performance.now() - this.startTime) / 1000;
    if (this.particles) {
      this.particles.rotation.y = elapsed * 0.05;
      this.particles.rotation.x = elapsed * 0.02;
    }
  };

  private stopOrbitAnimation(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = 0;
    }
    this.orbitRunning = false;
  }
}

