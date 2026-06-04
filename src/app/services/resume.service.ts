import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import { Resume, Profile, Skill, Project, Experience, Education, ContactInfo } from '../models/resume.model';

@Injectable({ providedIn: 'root' })
export class ResumeService {
  private resume$: Observable<Resume>;

  constructor(private http: HttpClient) {
    // Fetched at runtime — swap the JSON on the server to update without rebuilding
    this.resume$ = this.http
      .get<Resume>('assets/resume.json')
      .pipe(shareReplay(1));
  }

  getResume(): Observable<Resume> {
    return this.resume$;
  }

  getProfile(): Observable<Profile> {
    return this.resume$.pipe(map((r) => r.profile));
  }

  getSkills(): Observable<Skill[]> {
    return this.resume$.pipe(map((r) => r.skills));
  }

  getProjects(): Observable<Project[]> {
    return this.resume$.pipe(map((r) => r.projects));
  }

  getExperience(): Observable<Experience[]> {
    return this.resume$.pipe(map((r) => r.experience));
  }

  getEducation(): Observable<Education[]> {
    return this.resume$.pipe(map((r) => r.education));
  }

  getContact(): Observable<ContactInfo> {
    return this.resume$.pipe(map((r) => r.contact));
  }

  getSkillsByCategory(category: string): Observable<Skill[]> {
    return this.resume$.pipe(
      map((r) => r.skills.filter((s) => s.category === category))
    );
  }

  getFeaturedProjects(): Observable<Project[]> {
    return this.resume$.pipe(
      map((r) => r.projects.filter((p) => p.featured))
    );
  }
}
