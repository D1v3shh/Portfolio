import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Output,
  EventEmitter,
  NgZone,
} from '@angular/core';
import * as THREE from 'three';

/**
 * ThreeSceneComponent
 * -------------------
 * A reusable, standalone Angular component that sets up a full-screen
 * Three.js WebGLRenderer with essential lighting and a PerspectiveCamera.
 *
 * ### Features
 * - Full-viewport `<canvas>` managed by WebGLRenderer (antialiased, transparent background).
 * - PerspectiveCamera (FOV 75, near 0.1, far 1000).
 * - Ambient light for base illumination.
 * - Neon-cyan (#00f5ff) PointLight for a cyberpunk accent.
 * - `ResizeObserver`-based responsive resizing (no `window.resize` listener needed).
 * - Emits a `sceneReady` event once the scene, camera, and renderer are initialised
 *   so parent components can inject geometry, controls, or additional lights.
 *
 * ### Usage
 * ```html
 * <app-three-scene (sceneReady)="onSceneReady($event)"></app-three-scene>
 * ```
 * ```ts
 * onSceneReady({ scene, camera, renderer }: ThreeSceneReadyEvent) {
 *   // add meshes, particles, post-processing, etc.
 * }
 * ```
 */

/** Payload emitted by `sceneReady`. */
export interface ThreeSceneReadyEvent {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
}

@Component({
  selector: 'app-three-scene',
  standalone: true,
  template: `<canvas #rendererCanvas></canvas>`,
  styles: [
    `
      :host {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        z-index: 0;
        pointer-events: none;
      }

      canvas {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class ThreeSceneComponent implements AfterViewInit, OnDestroy {
  // ── Canvas reference ─────────────────────────────────────────────────
  @ViewChild('rendererCanvas', { static: true })
  private canvasRef!: ElementRef<HTMLCanvasElement>;

  // ── Output ───────────────────────────────────────────────────────────
  /** Emitted once after the Three.js scene graph and renderer are ready. */
  @Output() sceneReady = new EventEmitter<ThreeSceneReadyEvent>();

  // ── Three.js core objects ────────────────────────────────────────────
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;

  // ── Internal bookkeeping ─────────────────────────────────────────────
  private resizeObserver!: ResizeObserver;
  private animationId = 0;

  // ── Public read-only accessors (for imperative use via @ViewChild) ──
  get threeScene(): THREE.Scene {
    return this.scene;
  }
  get threeCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }
  get threeRenderer(): THREE.WebGLRenderer {
    return this.renderer;
  }

  constructor(private ngZone: NgZone) {}

  // ═══════════════════════════════════════════════════════════════════════
  // Lifecycle
  // ═══════════════════════════════════════════════════════════════════════

  ngAfterViewInit(): void {
    this.initRenderer();
    this.initScene();
    this.initCamera();
    this.initLighting();
    this.initResizeObserver();

    // Notify consumers that everything is wired up.
    this.sceneReady.emit({
      scene: this.scene,
      camera: this.camera,
      renderer: this.renderer,
    });

    // Kick off the render loop outside Angular's zone to avoid
    // triggering unnecessary change-detection cycles on every frame.
    this.ngZone.runOutsideAngular(() => this.tick());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    this.resizeObserver?.disconnect();
    this.renderer?.dispose();
  }

  // ═══════════════════════════════════════════════════════════════════════
  // Initialisation helpers
  // ═══════════════════════════════════════════════════════════════════════

  private initRenderer(): void {
    const canvas = this.canvasRef.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true, // transparent background so CSS backdrop shows through
    });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
  }

  private initScene(): void {
    this.scene = new THREE.Scene();
  }

  private initCamera(): void {
    const canvas = this.canvasRef.nativeElement;
    const aspect = canvas.clientWidth / canvas.clientHeight;

    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    this.camera.position.set(0, 0, 5);
  }

  private initLighting(): void {
    // Subtle ambient fill so nothing is pure-black.
    const ambient = new THREE.AmbientLight(0x111122, 0.4);
    this.scene.add(ambient);

    // Neon-cyan point light — the hero accent light.
    const neonCyan = new THREE.PointLight(0x00f5ff, 1.5, 80);
    neonCyan.position.set(5, 5, 5);
    this.scene.add(neonCyan);

    // Directional light for consistent, scene-wide illumination.
    const directional = new THREE.DirectionalLight(0x00f5ff, 0.6);
    directional.position.set(-3, 4, 2);
    this.scene.add(directional);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // Responsive resize via ResizeObserver
  // ═══════════════════════════════════════════════════════════════════════

  private initResizeObserver(): void {
    const canvas = this.canvasRef.nativeElement;

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) return;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height, false);
      }
    });

    // Observe the host element so the canvas resizes with the viewport.
    this.resizeObserver.observe(canvas.parentElement ?? canvas);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // Render loop
  // ═══════════════════════════════════════════════════════════════════════

  private tick = (): void => {
    this.animationId = requestAnimationFrame(this.tick);
    this.renderer.render(this.scene, this.camera);
  };
}
