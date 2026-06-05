import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ResumeData,
  Basics,
  SocialProfile,
  SkillGroup,
  ProjectEntry,
  WorkEntry,
  EducationEntry,
  CertificateEntry,
} from '../models/resume.model';

/**
 * Single source of truth for all resume data.
 *
 * • Fetches `assets/resume.json` once at runtime via HttpClient.
 * • Cached with `shareReplay(1)` — every subscriber gets the same
 *   response without a second HTTP request.
 * • To update the portfolio, edit `resume.json` and redeploy the
 *   static asset — zero code changes required.
 */
@Injectable({ providedIn: 'root' })
export class ResumeService {
  private readonly resume$: Observable<ResumeData>;

  constructor(private http: HttpClient) {
    this.resume$ = this.http
      .get<ResumeData>('assets/resume.json')
      .pipe(shareReplay(1));
  }

  /* ── full document ───────────────────────────────────────── */

  getResume(): Observable<ResumeData> {
    return this.resume$;
  }

  /* ── basics ──────────────────────────────────────────────── */

  getBasics(): Observable<Basics> {
    return this.resume$.pipe(map((r) => r.basics));
  }

  getProfiles(): Observable<SocialProfile[]> {
    return this.resume$.pipe(map((r) => r.basics.profiles));
  }

  /* ── skills ──────────────────────────────────────────────── */

  getSkills(): Observable<SkillGroup[]> {
    return this.resume$.pipe(map((r) => r.skills));
  }

  /** Find a single skill category by name, e.g. "Cloud & AWS" */
  getSkillGroupByName(name: string): Observable<SkillGroup | undefined> {
    return this.resume$.pipe(
      map((r) => r.skills.find((s) => s.name === name))
    );
  }

  /* ── projects ────────────────────────────────────────────── */

  getProjects(): Observable<ProjectEntry[]> {
    return this.resume$.pipe(map((r) => r.projects));
  }

  getFeaturedProjects(): Observable<ProjectEntry[]> {
    return this.resume$.pipe(
      map((r) => r.projects.filter((p) => p['x-featured']))
    );
  }

  /* ── work ────────────────────────────────────────────────── */

  getWork(): Observable<WorkEntry[]> {
    return this.resume$.pipe(map((r) => r.work));
  }

  /* ── education ───────────────────────────────────────────── */

  getEducation(): Observable<EducationEntry[]> {
    return this.resume$.pipe(map((r) => r.education));
  }

  /* ── certificates ────────────────────────────────────────── */

  getCertificates(): Observable<CertificateEntry[]> {
    return this.resume$.pipe(map((r) => r.certificates ?? []));
  }
}
