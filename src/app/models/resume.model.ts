/**
 * TypeScript interfaces matching the JSON Resume open standard.
 * @see https://jsonresume.org/schema
 *
 * Extension fields (prefixed with x-) are used for portfolio-specific data
 * that the standard doesn't cover.
 *
 * ─── Naming Convention ───────────────────────────────────────────
 * Every exported type uses a descriptive suffix so consuming
 * components never collide with DOM / Angular built-in names:
 *   ResumeData  – root document
 *   WorkEntry   – single work/experience item
 *   SkillGroup  – category with keywords
 *   ProjectEntry, EducationEntry, CertificateEntry …
 */

/* ── Location ────────────────────────────────────────────────── */

export interface Location {
  address?: string;
  postalCode?: string;
  city: string;
  countryCode: string;
  region: string;
}

/* ── Social profiles ─────────────────────────────────────────── */

export interface SocialProfile {
  network: string;
  username: string;
  url: string;
}

/* ── basics ──────────────────────────────────────────────────── */

export interface Basics {
  name: string;
  label: string;
  image: string;
  email: string;
  phone?: string;
  url?: string;
  summary: string;
  location: Location;
  profiles: SocialProfile[];
  /** Portfolio extension: one-liner tagline for hero section */
  'x-tagline'?: string;
  /** Portfolio extension: path to 3-D avatar GLB model */
  'x-avatarModel'?: string;
  /** Portfolio extension: downloadable resume PDF */
  'x-resumePdf'?: string;
}

/* ── work ────────────────────────────────────────────────────── */

export interface WorkEntry {
  name: string;
  location?: string;
  description?: string;
  position: string;
  url?: string;
  startDate: string;
  endDate?: string;
  summary: string;
  highlights: string[];
}

/* ── education ───────────────────────────────────────────────── */

export interface EducationEntry {
  institution: string;
  url?: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate?: string;
  score?: string;
  courses?: string[];
}

/* ── skills ──────────────────────────────────────────────────── */

export interface SkillGroup {
  name: string;
  level: string;
  keywords: string[];
}

/* ── projects ────────────────────────────────────────────────── */

export interface ProjectEntry {
  name: string;
  description: string;
  highlights: string[];
  keywords: string[];
  startDate?: string;
  endDate?: string;
  url?: string;
  roles?: string[];
  entity?: string;
  type?: string;
  /** Portfolio extension: show in featured grid */
  'x-featured'?: boolean;
}

/* ── certificates ────────────────────────────────────────────── */

export interface CertificateEntry {
  name: string;
  date?: string;
  issuer: string;
  url?: string;
}

/* ── meta ────────────────────────────────────────────────────── */

export interface Meta {
  canonical?: string;
  version?: string;
  lastModified?: string;
  'x-theme'?: string;
}

/* ── root document ───────────────────────────────────────────── */

export interface ResumeData {
  $schema?: string;
  basics: Basics;
  work: WorkEntry[];
  education: EducationEntry[];
  skills: SkillGroup[];
  projects: ProjectEntry[];
  certificates?: CertificateEntry[];
  meta?: Meta;
}

/* ── Convenience re-exports (shorter aliases) ────────────────── */

/** @deprecated Use ResumeData – kept for backward-compat during migration */
export type Resume = ResumeData;
/** @deprecated Use SkillGroup */
export type Skill = SkillGroup;
/** @deprecated Use ProjectEntry */
export type Project = ProjectEntry;
/** @deprecated Use WorkEntry */
export type Work = WorkEntry;
/** @deprecated Use EducationEntry */
export type Education = EducationEntry;
/** @deprecated Use CertificateEntry */
export type Certificate = CertificateEntry;
/** @deprecated Use SocialProfile */
export type Profile = SocialProfile;
