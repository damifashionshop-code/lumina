// Assembles the full positive report from local calculations only.
// FUTURE (monetization / backend hooks):
//  - Premium report: extend `Report` with extra sections and gate them
//    behind a payment provider (e.g. Stripe Checkout / Paddle) here.
//  - PDF: plug jsPDF or a serverless endpoint here (see ReportScreen).
//  - Email capture: send `Report` to a backend ONLY with explicit consent.
//  - Analytics: fire a privacy-friendly event (e.g. Plausible) here.
import { archetypes, lifePath, strengthsPool, growthPool, weeklyPool, affirmationsPool, mottosPool, resourcesPool, energytexts } from '../content/library';
import type { L, ResourceRow } from '../content/library';
import { lifePathNumber, periodEnergy } from './numerology';
import { buildMatrix, balanceValues, yearArcana } from './matrix';
import type { MatrixPoint, MatrixPurpose } from './matrix';
import { ikigaiDirections } from './ikigai';
import type { IkigaiAnswers } from './ikigai';
import { seedFromString, mulberry32, pickN } from './random';

export interface UserInput {
  name: string;
  dob: string; // YYYY-MM-DD
  time?: string;
  city?: string;
  ikigai: IkigaiAnswers;
}

export interface Report {
  name: string;
  archetypeValue: number;
  lifePathValue: number;
  matrix: { points: MatrixPoint[]; center: number; purpose: MatrixPurpose };
  yearArcana: number;
  strengths: L[];
  growth: L[];
  directions: { ru: string[]; en: string[] };
  balance: number[];
  resources: ResourceRow[];
  energyYear: L; energyMonth: L;
  weekly: L[];
  affirmations: L[];
  motto: L;
}

export function generateReport(input: UserInput): Report {
  const seed = seedFromString(`${input.dob}|${input.name.toLowerCase()}|${input.time ?? ''}|${input.city ?? ''}`);
  const rnd = mulberry32(seed);
  const matrix = buildMatrix(input.dob);
  const lp = lifePathNumber(input.dob);
  const period = periodEnergy(input.dob);
  const rndRu = mulberry32(seed ^ 0x9e3779b9);
  const rndEn = mulberry32(seed ^ 0x9e3779b9);
  return {
    name: input.name.trim() || '✨',
    archetypeValue: matrix.center,
    lifePathValue: lp,
    matrix,
    yearArcana: yearArcana(input.dob),
    strengths: pickN(strengthsPool, 5, rnd),
    growth: pickN(growthPool, 3, rnd),
    directions: {
      ru: ikigaiDirections(input.ikigai, 'ru', rndRu),
      en: ikigaiDirections(input.ikigai, 'en', rndEn),
    },
    balance: balanceValues(input.dob, input.name),
    resources: pickN(resourcesPool, 4, rnd),
    energyYear: energytexts[period.year],
    energyMonth: energytexts[period.month],
    weekly: pickN(weeklyPool, 3, rnd),
    affirmations: pickN(affirmationsPool, 3, rnd),
    motto: pickN(mottosPool, 1, rnd)[0],
  };
}

export { archetypes, lifePath };
